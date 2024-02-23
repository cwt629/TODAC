package community.board.service;

import chat.data.CounselorDetailInterface;
import community.board.data.MainListInterface;
import community.board.repository.BoardDao;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;

import java.util.List;

@Service
@AllArgsConstructor
public class BoardService {
    private BoardDao boardDao;

    public List<MainListInterface> getBoardList(){
        return boardDao.getBoardList();
    }
}
