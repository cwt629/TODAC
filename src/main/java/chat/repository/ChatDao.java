package chat.repository;

import org.springframework.stereotype.Repository;

import chat.data.ChatRoomDto;
import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class ChatDao {
	ChatRoomRepository roomRepository;
	
	// 채팅방 하나 만들어 저장하기
	public void insertChatRoom(ChatRoomDto dto) {
		roomRepository.save(dto);
	}
}
