package community.board.repository;

import community.board.data.BoardDto;
import org.springframework.stereotype.Repository;
import lombok.AllArgsConstructor;

import java.util.List;

@Repository
@AllArgsConstructor
public class BoardDao {
    private BoardDaoInter boardDaoInter;

    //추가
    public void addBoard (BoardDto dto) {
        boardDaoInter.save(dto);
    }

    public List<BoardDto> getAllBoards() {
        return boardDaoInter.findAll();
    }
}
