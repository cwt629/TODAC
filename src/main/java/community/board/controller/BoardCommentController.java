package community.board.controller;

import community.board.data.BoardCommentDto;
import community.board.data.BoardDto;
import community.board.data.BoardListDto;
import community.board.data.CommentListDto;
import community.board.repository.BoardCommentDao;
import community.board.repository.BoardDao;
import lombok.RequiredArgsConstructor;
import mypage.data.MemberDto;
import mypage.repository.MemberDao;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Member;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class BoardCommentController {
    private final BoardCommentDao boardCommentDao;
    private final MemberDao memberDao;

    //관리자 게시판에서 회원 댓글 출력할때 사용하는 로직
    @PostMapping("/admin/member/comment")
    public List<BoardCommentDto> getMemberCommentData(@RequestParam("usercode") int usercode)
    {
        return boardCommentDao.getMemberCommentData(usercode);
    }

    //게시글 댓글 삭제
    @DeleteMapping("/comment/delete")
    public void commentdelete(@RequestParam("commentcode") int commentcode)
    {
        boardCommentDao.commentDelete(commentcode);
    }
    //댓글 추가
@PostMapping("/addcomment")
public void addComment(@RequestParam("usercode") int usercode,
                       @RequestParam("content") String content,
                       @RequestParam("boardcode") int boardcode) {
    MemberDto memberDto = new MemberDto();
    memberDto.setUsercode(usercode);

    BoardDto boardDto = new BoardDto();
    boardDto.setBoardcode(boardcode);

    BoardCommentDto boardCommentDto = new BoardCommentDto();
    boardCommentDto.setBoard(boardDto);
    boardCommentDto.setMember(memberDto);
    boardCommentDto.setContent(content);

    boardCommentDao.insertComment(boardCommentDto);
}

    //특정글에 달린 댓글 반환
    @GetMapping("/commentlist")
    public List<CommentListDto> list() {
        List<BoardCommentDto> allComments = boardCommentDao.getAllComments();
        return allComments.stream().map(CommentListDto::new).toList();
    }
}
