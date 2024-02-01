package community.board.controller;

import org.springframework.web.bind.annotation.RestController;

import community.board.repository.BoardDao;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class BoardController {
	private final BoardDao boardDao;

}
