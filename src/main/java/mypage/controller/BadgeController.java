package mypage.controller;

import lombok.RequiredArgsConstructor;
import mypage.data.BadgeDto;
import mypage.data.MemberDto;
import mypage.repository.BadgeDao;
import mypage.repository.MemberDao;
import naver.storage.NcpObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class BadgeController {
	@Autowired
	private final BadgeDao badgeDao;

	@PostMapping("/badgeinsert")
	public void userInsertToBadge(@RequestParam("usercode") int usercode){
		MemberDto memberDto = new MemberDto();
		BadgeDto badgeDto = new BadgeDto();
		memberDto.setUsercode(usercode);
		badgeDto.setMember(memberDto);

		badgeDao.insertMembertoBadge(badgeDto);

	}

	@PostMapping("/updatebadge")
	public void updatebadge(@RequestParam("usercode") int usercode){

	}
}