package game.controller;

import java.util.HashMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import mypage.data.MemberDto;
import mypage.data.PointRecordDto;
import mypage.repository.MemberDao;
import mypage.repository.PointRecordDao;


@RestController
@RequiredArgsConstructor
public class GameController {
	
	private final MemberDao memberDao;
	private final PointRecordDao pointRecordDao;
	
	@PostMapping("/game/insertpoint")
	public @ResponseBody HashMap<String, Object> insertPoint(@RequestBody HashMap<String, Object> reqMap) throws Exception {
		HashMap<String, Object> retMap = new HashMap<String, Object>();
		
		//System.out.println(" ============================ reqMap : " + reqMap);
		
		int score = Integer.parseInt(reqMap.get("score").toString()); 
		int usercode = Integer.parseInt(reqMap.get("usercode").toString());
		
		if(score>800) {
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
        pdto.setType("오늘의미소");
        pdto.setMember(memdto);
        pointRecordDao.inserPointRecord(pdto);
		
		return retMap;
	}
}
