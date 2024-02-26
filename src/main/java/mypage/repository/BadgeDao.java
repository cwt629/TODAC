package mypage.repository;

import lombok.AllArgsConstructor;
import mypage.data.BadgeDto;
import mypage.data.MemberDto;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class BadgeDao {
	BadgeRepository badgeRepository;
	
		//db저장
		public void insertMembertoBadge(BadgeDto dto)
		{
			badgeRepository.save(dto);
		}

		public boolean checkAchivename(@Param("usercode") int usercode, @Param("achievename") String achievename){
			int result = badgeRepository.checkAchivename(usercode,achievename);
			if(result==0)
				return true;
			else
			 	return false;
		}

		public List<BadgeDto> getAchiveList(@Param("usercode") int usercode)
		{
			return badgeRepository.getAchiveList(usercode);
		}
}