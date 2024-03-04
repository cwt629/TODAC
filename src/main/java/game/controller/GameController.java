package game.controller;

import java.util.HashMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import mypage.data.BadgeDto;
import mypage.data.MemberDto;
import mypage.data.PointRecordDto;
import mypage.repository.BadgeDao;
import mypage.repository.MemberDao;
import mypage.repository.PointRecordDao;


@RestController
@RequiredArgsConstructor
public class GameController {
	
	private final MemberDao memberDao;
	private final PointRecordDao pointRecordDao;
	private final BadgeDao badgeDao;
	
	@PostMapping("/game/insertpoint")
	public @ResponseBody HashMap<String, Object> insertPoint(@RequestBody HashMap<String, Object> reqMap) throws Exception {
		HashMap<String, Object> retMap = new HashMap<String, Object>();
		
		System.out.println(" ============================ reqMap : " + reqMap);
		
		int score = Integer.parseInt(reqMap.get("score").toString()); 
		int usercode = Integer.parseInt(reqMap.get("usercode").toString());
		int badge = 1; 
		String achievename = "프로웃음러";
		BadgeDto badgeDto = new BadgeDto();
		
		if(score>800) {
			boolean possible = badgeDao.checkAchivename(usercode,achievename);
			if(possible) {
				badge = 0;
				MemberDto memberDto = new MemberDto();
				memberDto.setUsercode(usercode);
				badgeDto.setMember(memberDto);
				badgeDto.setAchievename(achievename);
				badgeDao.insertMembertoBadge(badgeDto);
			}
			score = 100;
		} else { 
			score = 10;
		}
		
        MemberDto memdto = memberDao.getMemberByData(usercode);
        int point;
        point = memdto.getPoint();
        point += score;
        memdto.setPoint(point);
        memberDao.insertMember(memdto);

        PointRecordDto pdto = new PointRecordDto();
        pdto.setAmount(score);
        pdto.setType("미소팡팡");
        pdto.setMember(memdto);
        pointRecordDao.inserPointRecord(pdto);
        retMap.put("badge",badge);
        
		return retMap;
	}
}
