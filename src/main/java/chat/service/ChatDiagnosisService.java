package chat.service;

import org.springframework.stereotype.Service;

import chat.data.ChatDiagnosisDto;
import chat.data.ChatDiagnosisInterface;
import chat.repository.ChatDiagnosisRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatDiagnosisService {
	private final ChatDiagnosisRepository chatDiagnosisRepository;
	
	public void saveChatDiagnosis(ChatDiagnosisDto chatDiagnosisDto) {
		chatDiagnosisRepository.save(chatDiagnosisDto);
	}
	
	public ChatDiagnosisInterface findByChatroom(Short chatroomcode) {
		return chatDiagnosisRepository.findByChatroom(chatroomcode);
	}
	
	// 업적
	public int getDiagnosisCountByUser(int usercode) {
		return chatDiagnosisRepository.getDiagnosisCountByUser(usercode);
	}
}
