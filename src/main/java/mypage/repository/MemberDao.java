package mypage.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import lombok.AllArgsConstructor;
import mypage.data.MemberDto;

@Repository
@AllArgsConstructor
public class MemberDao {
	MemberRepository daoInter;
	
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
		
		//user list만
       public List<MemberDto> getAllUser ()
       {
          return daoInter.findAllUsers();
       }

		public MemberDto getMemberByID(String userid)
		{
			return daoInter.getMemberByID(userid);
		}
		
		//서연 작성-받는 데이터값 usercode로 통일 시키려고 만들었씀
		public MemberDto getMemberByData(int usercode)
		{
			return daoInter.getMemberByData(usercode);
		}
		
		public void deleteMember(int usercode)
		{
			daoInter.deleteMember(usercode);
		}


}
