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
		ChatLogPageDto dto = new ChatLogPageDto();
		// 1. 상담사 이름 받기
		String counselorname = chatService.getCounselorNameInRoom(chatroomcode);
		dto.setCounselorname(counselorname);
		
		// 목록 받기에 앞서서, 멤버와 각 상담사들의 프로필을 받아온다
		List<String> speakersPhoto = new ArrayList<>();
		
		String memberPhoto = chatService.getMemberPhotoInRoom(chatroomcode); // 사용자의 사진
		List<CounselorDto> counselors = counselorService.getBasicCounselorList(); // 모든 상담사 정보
		// speaker 0: 사용자의 프로필 사진
		speakersPhoto.add(memberPhoto);
		// speaker 1~6: 상담사의 프로필 사진
		for (CounselorDto cdto: counselors) {
			speakersPhoto.add(COUNSELOR_PHOTO_PREFIX + cdto.getPhoto());
		}
		
		// 2. 채팅 목록 받기
		List<ChatLogDto> chatlog = chatService.selectLog(chatroomcode);
		List<ChatLogInfoDto> chatLogInfo = new ArrayList<>();
		for (int i = 0; i < chatlog.size(); i++) {
			ChatLogInfoDto infoDto = new ChatLogInfoDto();
			infoDto.setProfilephoto(speakersPhoto.get(chatlog.get(i).getSpeaker()));
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
}
