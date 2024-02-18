package chat.service;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import chat.data.ChatDiagnosisDto;
import chat.repository.ChatDiagnosisRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatDiagnosisService {
	private final ChatDiagnosisRepository chatDiagnosisRepository;
	
	public void saveChatDiagnosis(ChatDiagnosisDto chatDiagnosisDto) {
		chatDiagnosisRepository.save(chatDiagnosisDto);
	}
	
	public ChatDiagnosisDto findByChatroom(Short chatroomcode) {
		return chatDiagnosisRepository.findByChatroom(chatroomcode);
	}
}
