package community.board.repository;

import community.board.data.BoardDto;
import org.springframework.stereotype.Repository;
import lombok.AllArgsConstructor;

import java.util.List;

@Repository
@AllArgsConstructor
public class BoardDao {
    private BoardRepository boardRepository;

    //추가
    public void addBoard (BoardDto dto) {
        boardRepository.save(dto);
    }

    public List<BoardDto> getAllBoards() {
        return boardRepository.findAll();
    }
    
    public List<BoardDto> getMemberPostData(int usercode)
    {
    	System.out.println("getMemberPostData 메서드 호출됨. usercode: " + usercode);
    	return boardRepository.getMemberPostData(usercode);
    }
}
