package chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import chat.data.ChatRoomDto;
import chat.data.ChatSummaryDto;

public interface ChatSummaryRepository extends JpaRepository<ChatSummaryDto, Integer>{
	ChatSummaryDto findByChatroom(ChatRoomDto chatroom);
}
