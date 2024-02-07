package chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import chat.data.ChatRoomDto;

public interface ChatRoomRepository extends JpaRepository<ChatRoomDto, Short> {
	
}
