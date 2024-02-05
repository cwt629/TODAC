package mypage.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import mypage.data.QnaDto;
import mypage.repository.QnaDao;

@RestController
@RequiredArgsConstructor
public class QnaController {
	private final QnaDao qnaDao;

	//추가
	@PostMapping("/user/inquiry/form")
	public void insert(@RequestBody QnaDto dto) //@RequestBody생략하면 안됨 생략하면 모델어트리뷰트로 읽음
	{
		//db insert
		qnaDao.insertQna(dto);
	}
}
