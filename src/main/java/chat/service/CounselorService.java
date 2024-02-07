package chat.service;

import org.springframework.stereotype.Service;

import chat.data.CounselorDto;
import chat.repository.CounselorDao;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CounselorService {
	private CounselorDao counselorDao;
	
	public CounselorDto getCounselorByCode(Short counselorcode) {
		return counselorDao.getCounselorByCode(counselorcode);
	}
}
