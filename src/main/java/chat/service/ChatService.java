package chat.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import chat.data.ChatLogDto;
import chat.data.ChatRoomDto;
import chat.repository.ChatDao;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ChatService {
	private ChatDao chatDao;
	
	// 채팅 로그 저장
	public void insertChatLog(ChatRoomDto dto, List<ChatLogDto> log) {
		Map<String, Object> map = new HashMap<>();
		map.put("room", dto);
		map.put("log", log);
		
		chatDao.insertChatLog(map);
	}
}
