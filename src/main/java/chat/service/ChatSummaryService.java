package chat.service;

import org.springframework.stereotype.Service;

import chat.data.ChatRoomDto;
import chat.data.ChatSummaryDto;
import chat.repository.ChatSummaryRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatSummaryService {
	private final ChatSummaryRepository chatSummaryRepository;

    public void saveChatSummary(ChatSummaryDto chatSummaryDto) {
        chatSummaryRepository.save(chatSummaryDto);
    }
    
    public ChatSummaryDto findByChatroom(Short chatroomcode) {
        return chatSummaryRepository.findByChatroom(chatroomcode);
    }
}
