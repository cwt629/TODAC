package mypage.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import lombok.AllArgsConstructor;
import mypage.data.MemberDto;

@Repository
@AllArgsConstructor
public class MemberDao {
	MemberDaoInter daoInter;
	
		//db저장
		public void insertMember(MemberDto dto)
		{
			//System.out.println(" ====================== " + dto);
			daoInter.save(dto);
		}
		
		//list
		public List<MemberDto> getAllMember ()
		{
			return daoInter.findAll();
		}

}
