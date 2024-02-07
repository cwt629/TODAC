package chat.repository;

import org.springframework.stereotype.Repository;

import chat.data.CounselorDto;
import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class CounselorDao {
	CounselorRepository counselorRepository;
	
	public CounselorDto getCounselorByCode(Short counselorcode) {
		return counselorRepository.getReferenceById(counselorcode);
	}
}
