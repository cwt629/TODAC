package chat.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import chat.data.ChatLogDto;
import chat.data.ChatRoomDto;
import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class ChatDao {
	ChatRoomRepository roomRepository;
	ChatLogRepository logRepository;
	
	// 채팅 로그 저장하고, 해당 roomcode를 반환하는 함수
	public Short insertChatLog(Map<String, Object> map) {
		// 1. 채팅방 만들기
		ChatRoomDto roomDto = roomRepository.save((ChatRoomDto)map.get("room"));
		
		// 2. 만들어진 채팅방을 바탕으로 로그 저장
		List<ChatLogDto> log = (List<ChatLogDto>)map.get("log");
		for (ChatLogDto logdto: log) {
			ChatLogDto chatLogDto = new ChatLogDto();
			chatLogDto.setChatroom(roomDto);
			chatLogDto.setSpeaker(logdto.getSpeaker());
			chatLogDto.setContent(logdto.getContent());
			
			logRepository.save(chatLogDto);
		}
		
		// 만들어진 채팅방의 코드를 넘겨준다
		return roomDto.getChatroomcode();
	}
	
	public List<ChatLogDto> selectLog(Short chatroomcode){
		return logRepository.selectLog(chatroomcode);
	}
}
