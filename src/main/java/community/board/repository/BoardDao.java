package community.board.repository;

import community.board.data.BoardCommentDto;
import community.board.data.BoardDto;
import community.board.data.BoardListDto;
import org.springframework.stereotype.Repository;
import lombok.AllArgsConstructor;

import java.util.List;

@Repository
@AllArgsConstructor
public class BoardDao {
    private BoardRepository boardRepository;
    private BoardCommentRepository boardCommentRepository;

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
    
    public List<BoardDto> getMemberPostData(int usercode)
    {
    	System.out.println("getMemberPostData 메서드 호출됨. usercode: " + usercode);
    	return boardRepository.getMemberPostData(usercode);
    }
    
    public List<BoardCommentDto> getMemberCommentData(int usercode)
    {
    	System.out.println("getMemberCommentData 메서드 호출됨. usercode: " + usercode);
    	return boardCommentRepository.getMemberCommentData(usercode);
    }

}
