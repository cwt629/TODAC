package community.board.repository;

import community.board.data.BoardCommentDto;
import community.board.data.BoardDto;
import org.springframework.data.domain.Sort;
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
        return boardRepository.findAll(Sort.by(Sort.Direction.DESC,"boardcode"));
    }

    //조회수 로직
    public void updateReadcount(int boardcode) {
        boardRepository.updateReadcount(boardcode);
    }

    //해당페이지 로직
    public BoardDto getSelectPage(int boardcode) {
        return boardRepository.getSelectPage(boardcode);
    }

    public BoardDto getSelectData(int boardcode) {
        return boardRepository.getReferenceById(boardcode);
    }

    public void updateBoard(BoardDto boardDto) {
        boardRepository.save(boardDto);
    }
    
    public List<BoardDto> getMemberPostData(int usercode)
    {
    	System.out.println("getMemberPostData 메서드 호출됨. usercode: " + usercode);
    	return boardRepository.getMemberPostData(usercode);
    }

    public void deletePost(int boardcode)
    {
        boardRepository.deletePost(boardcode);
    }
    


}
