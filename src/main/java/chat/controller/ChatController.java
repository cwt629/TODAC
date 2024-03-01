package chat.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import chat.data.ChatDiagnosisDto;
import chat.data.ChatDiagnosisInterface;
import chat.data.ChatInitialDto;
import chat.data.ChatListInterface;
import chat.data.ChatLogDto;
import chat.data.ChatLogInfoDto;
import chat.data.ChatLogPageDto;
import chat.data.ChatRoomDto;
import chat.data.ChatSummaryDto;
import chat.data.CounselorDto;
import chat.service.ChatDiagnosisService;
import chat.service.ChatService;
import chat.service.CounselorService;
import lombok.RequiredArgsConstructor;
import mypage.data.MemberDto;
import mypage.repository.MemberDao;

@RestController
@RequiredArgsConstructor
public class ChatController {
	private final MemberDao memberDao;
	private final CounselorService counselorService;
	private final ChatService chatService;
	private final ChatDiagnosisService diagnosisService;
	
	private String COUNSELOR_PHOTO_PREFIX = "https://kr.object.ncloudstorage.com/guest-hch/TODAC/counselors/";
	
	@GetMapping("/chat/init")
	public ChatInitialDto getChatInitialData(@RequestParam("counselorcode") Short counselorcode, @RequestParam("usercode") int usercode) {
		// 1. 상담사 정보
		CounselorDto counselorDto = counselorService.getCounselorByCode(counselorcode);
		// 2. 멤버 정보
		MemberDto memberDto = memberDao.getMemberByData(usercode);
		
		// CounselorDataDto 형태로 반환해주기
		ChatInitialDto dto = new ChatInitialDto(counselorDto, memberDto);
		
		return dto;
	}

	@PostMapping("/chat/finish")
	public Short insertChat(@RequestBody List<ChatLogDto> log, 
			@RequestParam("userid") String userid,
			@RequestParam("counselorcode") Short counselorcode,
			@RequestParam(value = "score", defaultValue = "-1") Short score) {
		// 1. 채팅방 정보 저장
		ChatRoomDto roomDto = new ChatRoomDto();
		roomDto.setCounselor(counselorService.getCounselorByCode(counselorcode));
		roomDto.setMember(memberDao.getMemberByID(userid));
		
		// 2. 해당 채팅방에 로그 저장
		Short roomcode = chatService.insertChatLog(roomDto, log, score);
		
		return roomcode;
	}
	
	@GetMapping("/chat/summary")
	public List<ChatLogDto> selectLog(@RequestParam("chatroomcode") Short chatroomcode) {
		
		return chatService.selectLog(chatroomcode);
	}
	
	@GetMapping("/chat/diagnosis")
	public List<ChatSummaryDto> selectSummaryDB(@RequestParam("chatroomcode") Short chatroomcode){
		return chatService.selectSummaryDB(chatroomcode);
	}
	
	@GetMapping("/chat/list")
	public List<ChatListInterface> getChatroomsOfMember(@RequestParam("usercode") int usercode){
		return chatService.getChatroomsOfMember(usercode);
	}
	
	@GetMapping("/chat/loginfo")
	public ChatLogPageDto getChatLogInfo(@RequestParam("chatroomcode") Short chatroomcode) {
		// 해당 chatroom의 정보
		ChatRoomDto roomDto = chatService.getRoomByCode(chatroomcode);
		
		ChatLogPageDto dto = new ChatLogPageDto();
		// 1. 상담사 이름 받기
		String counselorname = chatService.getCounselorNameInRoom(chatroomcode);
		dto.setCounselorname(counselorname);
		
		// 채팅 목록을 받기 앞서서, 사용자와 상담사의 프로필 사진을 각각 받아온다
		String memberPhoto = chatService.getMemberPhotoInRoom(chatroomcode); // 사용자의 사진
		String counselorPhoto = roomDto.getCounselor().getPhoto() != null? 
				COUNSELOR_PHOTO_PREFIX + roomDto.getCounselor().getPhoto()
				: null; // 상담사의 사진
		
		// 2. 채팅 목록 받기
		List<ChatLogDto> chatlog = chatService.selectLog(chatroomcode);
		List<ChatLogInfoDto> chatLogInfo = new ArrayList<>();
		for (int i = 0; i < chatlog.size(); i++) {
			ChatLogInfoDto infoDto = new ChatLogInfoDto();
			// 프로필 사진이 상담사/사용자 것인지는 speaker로 분류한다
			infoDto.setProfilephoto((chatlog.get(i).getSpeaker() > 0)? counselorPhoto : memberPhoto);
			infoDto.setSpeaker(chatlog.get(i).getSpeaker());
			infoDto.setContent(chatlog.get(i).getContent());
			
			chatLogInfo.add(infoDto);
		}
		dto.setLog(chatLogInfo);
		
		// 3. 진단서 발급 여부 받기
		ChatDiagnosisInterface diagnosisDto = diagnosisService.findByChatroom(chatroomcode);
		int diagnosisCount = (diagnosisDto != null)? 1 : 0;
		dto.setDiagnosisCount(diagnosisCount);
		
		return dto;
	}
	
	// 업적 1: '모두가 나의 파트너' - 모든 공식 상담사와 채팅
	@GetMapping("/chat/achieve/partners")
	public boolean checkAchievePartners(@RequestParam("usercode") int usercode) {
		int officialCount = chatService.getOfficialCounselorsCountByUser(usercode);
		
		return (officialCount >= 6);
	}
	
	// 업적 2: '다섯 번의 토닥' - 채팅 5회 종료
	@GetMapping("/chat/achieve/fivetodac")
	public boolean checkAchieveFiveTodac(@RequestParam("usercode") int usercode) {
		int chatCount = chatService.getChatCountByUser(usercode);
		
		return (chatCount >= 5);
	}
}
