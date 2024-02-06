package community.board.repository;

import community.board.data.BoardDto;
import org.springframework.stereotype.Repository;
import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class BoardDao {
    private BoardDaoInter boardDaoInter;

    //추가
    public void addBoard (BoardDto dto) {
        boardDaoInter.save(dto);
    }
}
