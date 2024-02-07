package chat.repository;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import chat.data.ChatLogDto;
import chat.data.ChatRoomDto;
import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class ChatDao {
	ChatRoomRepository roomRepository;
	ChatLogRepository logRepository;
	
	// 채팅 로그 저장하기
	public void insertChatLog(Map<String, Object> map) {
		// 1. 채팅방 만들기
		ChatRoomDto roomDto = roomRepository.save((ChatRoomDto)map.get("dto"));
		
		// 2. 만들어진 채팅방을 바탕으로 로그 저장
		for (ChatLogDto logdto: (List<ChatLogDto>)map.get("log")) {
			ChatLogDto chatLogDto = new ChatLogDto();
			chatLogDto.setChatroom(roomDto);
			chatLogDto.setSpeaker(logdto.getSpeaker());
			chatLogDto.setContent(logdto.getContent());
			
			logRepository.save(chatLogDto);
		}
	}
	
}
