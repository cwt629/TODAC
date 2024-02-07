package chat.service;

import org.springframework.stereotype.Service;

import chat.data.ChatRoomDto;
import chat.repository.ChatDao;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ChatService {
	private ChatDao chatDao;
	
	// 채팅방 저장
	public void insertChatRoom(ChatRoomDto dto) {
		chatDao.insertChatRoom(dto);
	}
}
