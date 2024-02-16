package community.donation.controller;

import mypage.data.MemberDto;
import mypage.data.PointRecordDto;
import mypage.repository.MemberDao;
import mypage.repository.PointRecordDao;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import community.donation.repository.DonationDao;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class DonationController {
	private final DonationDao donationDao;
	private final MemberDao memberdao;
	private final PointRecordDao pointRecordDao;

	@GetMapping("/getall/donation")
	public int totalDonation()
	{
		return donationDao.getTotalDonation();
	}

	@PostMapping("/donate")
	public boolean donation(@RequestParam("amount") int amount,
							@RequestParam("userid") String userid)
	{
		MemberDto dto = new MemberDto();
		dto = memberdao.getMemberByID(userid);
		int mypoint = dto.getPoint();

		//포인트, 기부금 계산
		if(mypoint<amount)
			return false;
		else {
			//member 포인트 차감
			dto.setPoint(mypoint-amount);
			memberdao.insertMember(dto);

			//pointrecord에 기록
			PointRecordDto Pdto = new PointRecordDto();
			Pdto.setMember(dto);
			Pdto.setAmount(amount);
			Pdto.setType("후원");
			pointRecordDao.inserPointRecord(Pdto);

			return true;
		}
	}

	@GetMapping("/get/top3Donor")
	public List<Map<String,Object>> getTop3Donor()
	{
		List<Map<String,Object>> map = donationDao.getTop3Donor();
		return map;
	}

}
