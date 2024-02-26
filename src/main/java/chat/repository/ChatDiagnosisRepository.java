package chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import chat.data.ChatDiagnosisDto;
import chat.data.ChatDiagnosisInterface;

public interface ChatDiagnosisRepository extends JpaRepository<ChatDiagnosisDto, Integer>{
	@Query(value = 
			"""
			select d.*, c.usercode as usercode 
			from chatdiagnosis d 
			left join chatroom c on d.chatroomcode = c.chatroomcode 
			where d.chatroomcode=:chatroomcode
			""", nativeQuery = true)
	ChatDiagnosisInterface findByChatroom(@Param("chatroomcode") Short chatroomcode);
}
