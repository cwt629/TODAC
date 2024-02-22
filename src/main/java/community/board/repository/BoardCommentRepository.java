package community.board.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import community.board.data.BoardCommentDto;
import jakarta.transaction.Transactional;

public interface BoardCommentRepository extends JpaRepository<BoardCommentDto, Integer>{
	@Query(value = "select * from boardcomment where usercode=:usercode",nativeQuery = true)
	public List<BoardCommentDto> getMemberCommentData(@Param("usercode") int usercode);
	
	@Modifying
	@Transactional
	@Query(value= "delete from boardcomment where commentcode = :commentcode", nativeQuery = true)
	public void commentDelete(@Param("commentcode") int commentcode);

	//usercode 에 해당하는 댓글 목록 출력하는 메서드
	@Query(value = "SELECT * FROM boardcomment WHERE boardcode=:boardcode",nativeQuery = true)
	List<BoardCommentDto> getBoardCommentList(@Param("boardcode") int boardcode);
}
