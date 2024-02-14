package chat.service;

import java.util.List;

import org.springframework.stereotype.Service;

import chat.data.CounselorDetailDto;
import chat.data.CounselorDto;
import chat.repository.CounselorDao;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CounselorService {
	private CounselorDao counselorDao;
	
	public List<CounselorDetailDto> getCounselorList(){
		return counselorDao.getCounselorList();
	}
	
	public CounselorDto getCounselorByCode(Short counselorcode) {
		return counselorDao.getCounselorByCode(counselorcode);
	}
}
