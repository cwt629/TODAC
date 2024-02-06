package chat.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import chat.data.ChatLogDto;
import chat.repository.ChatDao;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ChatController {
	private final ChatDao chatDao;

	@PostMapping("/chat/finish/noreview")
	public int insertChatWithoutReview(@RequestBody List<ChatLogDto> log) {
		
		for (int i = 0; i < log.size(); i++) {
			System.out.println("ㅋ");
		}
		
		return 0;
	}
}
