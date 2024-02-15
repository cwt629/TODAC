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

		//user list만
       public List<MemberDto> getAllUser ()
       {
          return memberRepository.findAllUsers();
       }

		public MemberDto getMemberByID(String userid)
		{
			return memberRepository.getMemberByID(userid);
		}
		
		//서연 작성-받는 데이터값 usercode로 통일 시키려고 만들었씀
		public MemberDto getMemberByData(int usercode)
		{
			return memberRepository.getMemberByData(usercode);
		}

		public void deleteMember(int usercode)
		{
            memberRepository.deleteMember(usercode);
		}

		public int nickNameCheck(String nickname)
		{
			return memberRepository.nickNameCheck(nickname);
		}

}
