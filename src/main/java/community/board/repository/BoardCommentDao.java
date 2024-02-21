package community.board.repository;

import community.board.data.BoardCommentDto;
import community.board.data.BoardDto;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class BoardCommentDao {
    private BoardCommentRepository boardCommentRepository;

    public List<BoardCommentDto> getMemberCommentData(int usercode)
    {
        System.out.println("getMemberCommentData 메서드 호출됨. usercode: " + usercode);
        return boardCommentRepository.getMemberCommentData(usercode);
    }

    public void commentDelete(int commentcode)
    {
        boardCommentRepository.commentDelete(commentcode);
    }

    //댓글 저장
    public void insertComment(BoardCommentDto boardCommentDto) {
        boardCommentRepository.save(boardCommentDto);
    }

    //list 출력
    public List<BoardCommentDto> getAllComments(int boardcode) {
        return boardCommentRepository.getBoardCommentList(boardcode);
    }
}
