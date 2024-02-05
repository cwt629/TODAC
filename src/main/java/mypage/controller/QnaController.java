package mypage.controller;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import mypage.data.QnaDto;
import mypage.repository.QnaDao;

@RestController
@RequiredArgsConstructor
public class QnaController {
	private final QnaDao qnaDao;
	
	@PostMapping("/insert")
	public String insert(@ModelAttribute QnaDto dto)
	{
		//db insert
		qnaDao.insertQna(dto);
		
		return "redirect:./"; //목록으로 이동
	}
}
