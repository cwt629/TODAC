package chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import chat.data.ChatReviewDto;

public interface ChatReviewRepository extends JpaRepository<ChatReviewDto, Integer> {

}
