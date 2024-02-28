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
	public boolean userInsertToBadge(@RequestParam("usercode") int usercode,
								  @RequestParam("achievename") String achievename){
		MemberDto memberDto = new MemberDto();
		BadgeDto badgeDto = new BadgeDto();
		memberDto.setUsercode(usercode);
		badgeDto.setMember(memberDto);
		badgeDto.setAchievename(achievename);

		boolean possible = badgeDao.checkAchivename(usercode,achievename);
		if(possible) {
			badgeDao.insertMembertoBadge(badgeDto);
			return true;
		}
		return false;
	}

	@PostMapping("/getachievelist")
	public List<BadgeDto> getachievelist(@RequestParam("usercode") int usercode){
		List<BadgeDto> dtolist = badgeDao.getAchiveList(usercode);
		return dtolist;
	}
}