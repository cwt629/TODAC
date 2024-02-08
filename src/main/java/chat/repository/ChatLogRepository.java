package chat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import chat.data.ChatLogDto;

public interface ChatLogRepository extends JpaRepository<ChatLogDto, Integer> {

 	@Query(value = "SELECT * FROM todacdb.chatlog where chatroomcode=:chatroomcode", nativeQuery = true)
 	public List<ChatLogDto> selectLog(@Param("chatroomcode") Short chatroomcode);
}
