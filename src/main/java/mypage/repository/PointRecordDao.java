package mypage.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import lombok.AllArgsConstructor;
import mypage.data.PointRecordDto;

@Repository
@AllArgsConstructor
public class PointRecordDao {
	PointRecordRepository daoInter;
	
	private PointRecordRepository pointRecordRepository;

	public List<PointRecordDto> getMemberPayMent(int usercode)
	{
		return pointRecordRepository.getMemberPayment(usercode);
	}
}
