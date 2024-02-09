package community.board.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import community.board.data.BoardCommentDto;

public interface BoardCommentRepository extends JpaRepository<BoardCommentDto, Integer>{
	@Query(value = "select * from boardcomment where usercode=:usercode",nativeQuery = true)
	public List<BoardCommentDto> getMemberCommentData(@Param("usercode") int usercode);
}
