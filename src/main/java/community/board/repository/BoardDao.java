package community.board.repository;

import community.board.data.BoardDto;
import community.board.data.BoardListDto;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;
import lombok.AllArgsConstructor;

import java.util.HashMap;
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
        return boardRepository.findAll(Sort.by(Sort.Direction.DESC,"boardcode"));
    }


//    public int getTotalCount(String search) {
//        return boardRepository.getTotalCountByTitle(search);
//    }


    public List<BoardDto> getMemberPostData(int usercode)
    {
    	System.out.println("getMemberPostData 메서드 호출됨. usercode: " + usercode);
    	return boardRepository.getMemberPostData(usercode);
    }

}
