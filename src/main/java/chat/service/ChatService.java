package chat.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import chat.data.ChatListInterface;
import chat.data.ChatLogDto;
import chat.data.ChatRoomDto;
import chat.data.ChatSummaryDto;
import chat.repository.ChatDao;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ChatService {
	private ChatDao chatDao;
	
	// 채팅 로그 저장
	public Short insertChatLog(ChatRoomDto dto, List<ChatLogDto> log, Short score) {
		Map<String, Object> map = new HashMap<>();
		map.put("room", dto);
		map.put("log", log);
		map.put("score", score);
		
		return chatDao.insertChatLog(map);
	}
	
	public List<ChatLogDto> selectLog(Short chatroomcode){
		return chatDao.selectLog(chatroomcode);
	}
	
	public ChatRoomDto getRoomByCode(Short chatroomcode) {
		return chatDao.getRoomByCode(chatroomcode);
	}
	
	public List<ChatSummaryDto> selectSummaryDB(Short chatroomcode){
		return chatDao.selectSummaryDB(chatroomcode);
	}
	
	public List<ChatListInterface> getChatroomsOfMember(int usercode) {
		return chatDao.getChatroomsOfMember(usercode);
	}
	
	public String getCounselorNameInRoom(Short chatroomcode) {
		return chatDao.getCounselorNameInRoom(chatroomcode);
	}
	
	public String getMemberPhotoInRoom(Short chatroomcode) {
		return chatDao.getMemberPhotoInRoom(chatroomcode);
	}
	
	public String getMemberUsercodeInRoom(Short chatroomcode) {
		return chatDao.getMemberUsercodeInRoom(chatroomcode);
	}
	
	// 업적
	public int getOfficialCounselorsCountByUser(int usercode) {
		return chatDao.getOfficialCounselorsCountByUser(usercode);
	}
	
	public int getChatCountByUser(int usercode) {
		return chatDao.getChatCountByUser(usercode);
	}
}
