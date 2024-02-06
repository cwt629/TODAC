package mypage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import mypage.data.QnaDto;
import mypage.repository.QnaDao;

@RestController
@RequiredArgsConstructor
public class QnaController {
	private final QnaDao qnaDao;

	//추가
	@PostMapping("/user/inquiry/add")
	public void qnaInsert(@RequestBody QnaDto dto) //@RequestBody생략하면 안됨 생략하면 모델어트리뷰트로 읽음
	{
		//db insert
		qnaDao.insertQna(dto);
	}

	//출력
	@PostMapping("/user/inquiry")
	public Map<String,Object> qnaList()
	{
		Map<String, Object> map=new HashMap<>();
		List<QnaDto> qna = qnaDao.getAllQna();
		map.put("qna",qna);
		//System.out.println("여기나오내"+qna);
		return map;
	}

	//출력
	//	@GetMapping("/user/inquiry")
	//	public List<QnaDto> list()
	//	{
	//		return qnaDao.getAllQna();
	//	}

	//dto반환
	@GetMapping("/user/inquiry/select") 
	public QnaDto select(@RequestParam("inquirycode") int inquirycode)
	{
		System.out.println("select>"+inquirycode);
		return qnaDao.getSelectQnaData(inquirycode);
	}
	
//	@GetMapping("/inquiryselect") 
//	public Map<String, Object> qnaDetail(@RequestParam("inquirycode") int inquirycode)
//	{
//		System.out.println("select>"+inquirycode);
//		Map<String, Object> map=new HashMap<>();
//		QnaDto qna = qnaDao.getSelectQnaData(inquirycode);
//		map.put("qna", qna);
//		return map;
//	}
}