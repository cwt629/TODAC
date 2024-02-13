package mypage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import community.board.data.BoardDto;
import community.board.data.BoardListDto;
import lombok.RequiredArgsConstructor;
import mypage.data.MemberDto;
import mypage.data.QnaAdminDto;
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


	@PostMapping("/user/inquiry/select") 
	public QnaAdminDto qnaSelect(@RequestBody HashMap<String, Object> reqMap ) throws Exception
	{
		//		System.out.println("======/user/inquiry/select select : "+reqMap);
		Object inquiryNumObj = reqMap.get("inquirycode");
		int inquiryNum = Integer.parseInt(inquiryNumObj.toString());
		//		System.out.println("======/user/inquiry/select inquiryNum : "+inquiryNum);
		QnaDto dto = qnaDao.getSelectQnaData(inquiryNum);
		//		System.out.println("======/user/inquiry/select dto : "+dto);
		return new QnaAdminDto(dto);
	}

	//answer추가
	@PostMapping("/admin/inquiryanswer/add")
	public void qnaAnswerInsert(@RequestBody QnaDto dto) //@RequestBody생략하면 안됨 생략하면 모델어트리뷰트로 읽음
	{
		qnaDao.addAnswer(dto);
	}

	//관리자 1:1문의 목록 를 출력할 때 사용하는 로직 (승민이 보드컨트롤러 참조)
	// 화면에 필요한 데이터만 핏 하게 뿌리고싶어서 dto를 새로만듬 엔티티는 데이터의 이동 통로가 되면 안된다.
	@GetMapping("/inquiry/list") 
	public List<QnaAdminDto> list() throws Exception {
		List<QnaDto> allInquiry = qnaDao.getAllInquiry();
		System.out.println("여기"+allInquiry);
		return allInquiry.stream().map(QnaAdminDto::new).toList();
	}

}