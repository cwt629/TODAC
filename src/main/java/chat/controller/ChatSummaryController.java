package chat.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import chat.data.ChatRoomDto;
import chat.data.ChatSummaryDto;
import chat.service.ChatService;
import chat.service.ChatSummaryService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class ChatSummaryController {
	private final ChatService chatService;
	private final ChatSummaryService chatSummaryService;

    @PostMapping("/chat/summary/save")
    public void saveChatSummary(@RequestBody ChatSummaryDto chatSummaryDto, @RequestParam("chatroomcode") Short chatroomcode) {
        // 1. chatroomcode를 통해서 ChatRoomDto 객체 받아오기
    	ChatRoomDto roomDto = chatService.getRoomByCode(chatroomcode);
    	
    	// 2. 그거를 chatSummaryDto 안에 setter로 넣어주기
    	chatSummaryDto.setChatroom(roomDto);
    	chatSummaryService.saveChatSummary(chatSummaryDto);
    }
    
    @GetMapping("/chat/summary/check")
    public ResponseEntity<ChatSummaryDto> checkChatSummary(@RequestParam("roomcode") Short roomcode) {
        // 1. roomcode를 통해서 ChatRoomDto 객체 받아오기
        ChatRoomDto roomDto = chatService.getRoomByCode(roomcode);
        
        // 2. 해당 roomDto를 가진 ChatSummaryDto를 찾아서 반환
        ChatSummaryDto chatSummaryDto = chatSummaryService.findByChatroom(roomDto);
        
        if (chatSummaryDto != null) {
            return ResponseEntity.ok(chatSummaryDto);
        } else {
            // DB에 해당 roomcode에 대한 요약본이 없을 경우에 대한 처리
            return ResponseEntity.notFound().build();
        }
    }

}
