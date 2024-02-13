package chat.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import chat.data.CounselorDataDto;
import chat.data.CounselorDto;
import chat.data.CounselorListDto;
import chat.service.CounselorService;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
public class CounselorController {
	private final CounselorService counselorService;

	@GetMapping("counselor/list")
	public List<CounselorListDto> getList(){
		List<CounselorDto> counselors = counselorService.getCounselorList();
		List<CounselorListDto> data = new ArrayList<>();
		
		for (CounselorDto counselorDto: counselors) {
			// TODO: 평균 별점 넣어주기
			CounselorListDto listDto = new CounselorListDto(counselorDto);
			data.add(listDto);
		}
		
		return data;
	}
	
	@GetMapping("counselor/select/chat")
	public CounselorDataDto getCounselorInChat(@RequestParam("counselorcode") Short counselorcode) {
		CounselorDto counselor = counselorService.getCounselorByCode(counselorcode);
		
		// CounselorDataDto 형태로 반환해주기
		CounselorDataDto dto = new CounselorDataDto(counselor);
		
		return dto;
	}
}
