package community.board.repository;

import community.board.data.BoardCommentDto;
import community.board.data.BoardDto;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import mypage.data.MemberDto;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.beans.Transient;
import java.util.List;

//@Query : repository에 원하는 쿼리를 작성하게 해주는 어노테이션
//value 속성 : 쿼리 작성부
//nativeQuery : JPA 에서 지정한 규칙을 모두 무시할 수 있는 속성
//@Modifying 은 insert, update, delete 뿐만 아니라 DDL 구문을 사용할 때도 표기를 해줘야 합니다
//@Transactional 은 update, delete 를 할 때 표기를 해줘야 정상 실행이 됩니다
//public 은 적어도되고 안적어도 됨
public interface BoardRepository extends JpaRepository<BoardDto, Integer> {
    
    //@Query : repository에 원하는 쿼리를 작성하게 해주는 어노테이션
    //value 속성 : 쿼리 작성부
    //nativeQuery : JPA 에서 지정한 규칙을 모두 무시할 수 있는 속성
	@Query(value = "select * from board where usercode=:usercode",nativeQuery = true)
    public  List<BoardDto> getMemberPostData(@Param("usercode") int usercode);
	
	@Modifying
	@Transactional
	@Query(value = "delete from board where boardcode = :boardcode", nativeQuery = true)
	public void deletePost(@Param("boardcode") int boardcode);
}
