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
import mypage.data.MemberDto;
import mypage.data.QnaDto;
import mypage.repository.MemberDao;
import mypage.repository.QnaDao;

@RestController
@RequiredArgsConstructor
public class QnaController {
	private final MemberDao memberDao;
	private final QnaDao qnaDao;

	//추가
	@PostMapping("/user/inquiry/add")
	public void qnaInsert(@RequestBody QnaDto dto,
			@RequestParam("usercode") int usercode) //@RequestBody생략하면 안됨 생략하면 모델어트리뷰트로 읽음
	{
		MemberDto memdto = new MemberDto();
		//db insert
		memdto.setUsercode(usercode);

		dto.setMember(memdto);

		qnaDao.insertQna(dto);
	}

	//로그인한 유저의 qna 만 출력
	@PostMapping("/user/inquiry")
	public Map<String,Object> qnaList(@RequestParam("usercode") int usercode) throws Exception
	{
		Map<String, Object> map=new HashMap<>();
		List<QnaDto> qna = qnaDao.getQnaByCode(usercode);
		map.put("qna",qna);
		//System.out.println("여기나오내"+qna);
		return map;
	}

	//qna 전체출력
	@PostMapping("/admin/inquiry/list")
	public Map<String,Object> qnaList() throws Exception
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
	//	@GetMapping("/user/inquiry/select") 
	//	public QnaDto qnaSelect(@RequestParam("inquirycode") int inquirycode)
	//	{
	//		System.out.println("select>"+inquirycode);
	//		return qnaDao.getSelectQnaData(inquirycode);
	//	}

	//	@GetMapping("/inquiryselect") 
	//	public Map<String, Object> qnaDetail(@RequestParam("inquirycode") int inquirycode)
	//	{
	//		System.out.println("select>"+inquirycode);
	//		Map<String, Object> map=new HashMap<>();
	//		QnaDto qna = qnaDao.getSelectQnaData(inquirycode);
	//		map.put("qna", qna);
	//		return map;
	//	}

	@PostMapping("/user/inquiry/select") 
	public QnaDto qnaSelect(@RequestBody HashMap<String, Object> reqMap ) throws Exception
	{
		//		System.out.println("======/user/inquiry/select select : "+reqMap);
		Object inquiryNumObj = reqMap.get("inquriycode");
		int inquiryNum = Integer.parseInt(inquiryNumObj.toString());
		//		System.out.println("======/user/inquiry/select inquiryNum : "+inquiryNum);
		QnaDto dto = qnaDao.getSelectQnaData(inquiryNum);
		//		System.out.println("======/user/inquiry/select dto : "+dto);
		return dto;
	}

	//answer추가
	@PostMapping("/admin/inquiryanswer/add")
	public void qnaAnswerInsert(@RequestBody QnaDto dto) //@RequestBody생략하면 안됨 생략하면 모델어트리뷰트로 읽음
	{
		qnaDao.addAnswer(dto);
	}
}