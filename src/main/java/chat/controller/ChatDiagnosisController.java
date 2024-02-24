package chat.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import chat.data.ChatDiagnosisDto;
import chat.data.ChatDiagnosisInterface;
import chat.data.ChatRoomDto;
import chat.service.ChatDiagnosisService;
import chat.service.ChatService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ChatDiagnosisController {
	private final ChatService chatService;
	private final ChatDiagnosisService chatDiagnosisService;
	
	@PostMapping("/chat/diagnosis/save")
	public void saveChatDiagnosis(@RequestBody ChatDiagnosisDto chatDiagnosisDto, @RequestParam("chatroomcode") Short chatroomcode) {
		ChatRoomDto roomDto = chatService.getRoomByCode(chatroomcode);
		chatDiagnosisDto.setChatroom(roomDto);
		chatDiagnosisService.saveChatDiagnosis(chatDiagnosisDto);
	}
	
	@GetMapping("/chat/diagnosis/check")
	public ChatDiagnosisInterface findByChatroom(@RequestParam("chatroomcode") Short chatroomcode) {
		return chatDiagnosisService.findByChatroom(chatroomcode);
	}
}
