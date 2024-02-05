package community.board.repository;

import community.board.data.BoardDto;
import org.springframework.data.jpa.repository.JpaRepository;


public interface BoardDaoInter extends JpaRepository<BoardDto, Integer> {
    //@Query : repository에 원하는 쿼리를 작성하게 해주는 어노테이션
    //value 속성 : 쿼리 작성부
    //nativeQuery : JPA 에서 지정한 규칙을 모두 무시할 수 있는 속성

}
