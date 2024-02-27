package chat.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import chat.data.CounselorDetailInterface;
import chat.data.CounselorDto;
import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class CounselorDao {
	CounselorRepository counselorRepository;
	
	public List<CounselorDetailInterface> getCounselorList(){
		return counselorRepository.getCounselorList();
	}
	
	public CounselorDto getCounselorByCode(Short counselorcode) {
		return counselorRepository.getReferenceById(counselorcode);
	}
	
	public List<CounselorDto> getBasicCounselorList(){
		return counselorRepository.findAll();
	}
	
	public List<CounselorDetailInterface> getCounselorListByUser(int usercode){
		return counselorRepository.getCounselorListByUser(usercode);
	}
	
	public void insertCounselor(CounselorDto dto) {
		counselorRepository.save(dto);
	}
}
