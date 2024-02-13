package community.board.repository;

import community.board.data.BoardCommentDto;
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
	BoardRepository daoInter;
	BoardCommentRepository daoCommentInter;
	
    private BoardRepository boardRepository;
    private BoardCommentRepository boardCommentRepository;

    //board추가
    public void addBoard (BoardDto dto) {
        boardRepository.save(dto);
    }

    //list출력
    public List<BoardDto> getAllBoards() {
        return boardRepository.findAll(Sort.by(Sort.Direction.DESC,"boardcode"));
    }
    
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
    
    public void deletePost(int boardcode)
    {
    	daoInter.deletePost(boardcode);
    }
    
    public void commentDelete(int commentcode)
    {
    	daoCommentInter.commentDelete(commentcode);
    }

}
