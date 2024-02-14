package chat.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import chat.data.CounselorDetailDto;
import chat.data.CounselorDto;
import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class CounselorDao {
	CounselorRepository counselorRepository;
	
	public List<CounselorDetailDto> getCounselorList(){
		return counselorRepository.getCounselorList();
	}
	
	public CounselorDto getCounselorByCode(Short counselorcode) {
		return counselorRepository.getReferenceById(counselorcode);
	}
}
