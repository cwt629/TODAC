package mypage.controller;

import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import mypage.repository.MypageDao;

@RestController
@RequiredArgsConstructor
public class MypageController {
	private final MypageDao userDao;

}
