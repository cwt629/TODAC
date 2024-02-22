package chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import chat.data.ChatDiagnosisDto;

public interface ChatDiagnosisRepository extends JpaRepository<ChatDiagnosisDto, Integer>{
	@Query(value = "select * from todacdb.chatdiagnosis where chatroomcode=:chatroomcode", nativeQuery = true)
	ChatDiagnosisDto findByChatroom(@Param("chatroomcode") Short chatroomcode);
}
