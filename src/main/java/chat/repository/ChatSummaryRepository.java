package chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import chat.data.ChatSummaryDto;

public interface ChatSummaryRepository extends JpaRepository<ChatSummaryDto, Integer>{
    @Query(value = "SELECT * FROM todacdb.chatsummary WHERE chatroomcode = :chatroomcode", nativeQuery = true)
    ChatSummaryDto findByChatroom(@Param("chatroomcode") Short chatroomcode);
}
