package chat.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import chat.data.CounselorDetailDto;
import chat.service.CounselorService;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
public class CounselorController {
	private final CounselorService counselorService;

	@GetMapping("counselor/list")
	public List<CounselorDetailDto> getList(){
		return counselorService.getCounselorList();
	}
}
