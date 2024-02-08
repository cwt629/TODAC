package community.board.repository;

import community.board.data.BoardDto;
import mypage.data.MemberDto;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface BoardRepository extends JpaRepository<BoardDto, Integer> {
    //@Query : repository에 원하는 쿼리를 작성하게 해주는 어노테이션
    //value 속성 : 쿼리 작성부
    //nativeQuery : JPA 에서 지정한 규칙을 모두 무시할 수 있는 속성
	@Query(value = "select * from board where usercode=:usercode",nativeQuery = true)
    public  List<BoardDto> getMemberPostData(@Param("usercode") int usercode);
	
	@Query(value = "select * from boardcomment where usercode=:usercode",nativeQuery = true)
	public List<BoardDto> getMemberCommentData(@Param("usercode") int usercode);
}
