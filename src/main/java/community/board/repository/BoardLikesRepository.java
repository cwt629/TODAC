package community.board.repository;

import community.board.data.BoardDto;
import community.board.data.BoardLikesDto;
import mypage.data.MemberDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BoardLikesRepository extends JpaRepository<BoardLikesDto, Integer> {

    int countByBoard(BoardDto board);

    Optional<BoardLikesDto> findByBoardAndMember(BoardDto board, MemberDto member);
}
