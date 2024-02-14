package chat.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import chat.data.ChatInitialDto;
import chat.data.ChatLogDto;
import chat.data.ChatRoomDto;
import chat.data.CounselorDto;
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
}
