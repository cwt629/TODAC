package community.board.repository;

import community.board.data.BoardDto;
import org.springframework.stereotype.Repository;
import lombok.AllArgsConstructor;

import java.util.List;

@Repository
@AllArgsConstructor
public class BoardDao {
    private BoardRepository boardRepository;

    //board추가
    public void addBoard (BoardDto dto) {
        boardRepository.save(dto);
    }

    //list출력
    public List<BoardDto> getAllBoards() {
        return boardRepository.findAll();
    }

    public int getTotalCount(String search) {
        return boardRepository.getTotalCountByTitle(search);
    }

//    public List<BoardDto> getAllDatas(String search, int startNum, int perPage) {
//    }
}
