package community.board.repository;

import community.board.data.BoardDto;
import community.board.data.BoardLikesDto;
import lombok.AllArgsConstructor;
import mypage.data.MemberDto;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class BoardLikesDao {
    private BoardLikesRepository boardLikesRepository;

    // 게시글과 회원을 기반으로 좋아요 정보 찾기
    public BoardLikesDto findByBoardAndMember(BoardDto board, MemberDto member) {
        return boardLikesRepository.findByBoardAndMember(board, member).orElse(null);
    }

    // 좋아요 정보 저장
    public void save(BoardLikesDto boardLikesDto) {
        boardLikesRepository.save(boardLikesDto);
    }

    // 좋아요 정보 삭제
    public void delete(BoardLikesDto boardLikesDto) {
        boardLikesRepository.delete(boardLikesDto);
    }

    // 게시글의 좋아요 개수 조회
    public int countByBoard(BoardDto board) {
        return boardLikesRepository.countByBoard(board);
    }
}
