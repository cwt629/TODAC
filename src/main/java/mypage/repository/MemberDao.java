package mypage.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import lombok.AllArgsConstructor;
import mypage.data.MemberDto;

@Repository
@AllArgsConstructor
public class MemberDao {
	MemberRepository memberRepository;
	
		//db저장
		public void insertMember(MemberDto dto)
		{
			//System.out.println(" ====================== " + dto);
			memberRepository.save(dto);
		}
		
		//list
		public List<MemberDto> getAllMember ()
		{
			return memberRepository.findAll();
		}

		public MemberDto getMemberByID(String userid)
		{
			return memberRepository.getMemberByID(userid);
		}
		
		public void deleteMember(String userid)
		{
			daoInter.deleteMember(userid);
		}

		public int nickNameCheck(String nickname)
		{
			return memberRepository.nickNameCheck(nickname);
		}

}
