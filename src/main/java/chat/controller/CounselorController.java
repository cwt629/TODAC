package chat.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import chat.data.CounselorDetailInterface;
import chat.service.CounselorService;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
public class CounselorController {
	private final CounselorService counselorService;

	@GetMapping("counselor/list")
	public List<CounselorDetailInterface> getList(){
		return counselorService.getCounselorList();
	}
}
