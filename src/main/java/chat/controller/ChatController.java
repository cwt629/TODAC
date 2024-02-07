package chat.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import chat.data.ChatLogDto;
import chat.data.ChatRoomDto;
import chat.repository.ChatDao;
import chat.repository.CounselorRepository;
import chat.service.ChatService;
import chat.service.CounselorService;
import lombok.RequiredArgsConstructor;
import mypage.repository.MemberDao;

@RestController
@RequiredArgsConstructor
public class ChatController {
	private final MemberDao memberDao;
	private final CounselorService counselorService;
	private final ChatService chatService;

	@PostMapping("/chat/finish/noreview")
	public int insertChatWithoutReview(@RequestBody List<ChatLogDto> log, @RequestParam("userid") String userid, @RequestParam("counselorcode") Short counselorcode) {
		// 1. 채팅방 정보 저장
		ChatRoomDto roomDto = new ChatRoomDto();
		roomDto.setCounselor(counselorService.getCounselorByCode(counselorcode));
		roomDto.setMember(memberDao.getMemberByID(userid));
		
		chatService.insertChatRoom(roomDto);
		
		
		return 0;
	}
}
