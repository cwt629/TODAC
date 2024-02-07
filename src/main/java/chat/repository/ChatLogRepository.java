package chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import chat.data.ChatLogDto;

public interface ChatLogRepository extends JpaRepository<ChatLogDto, Integer> {

}
