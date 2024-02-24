package mypage.repository;

import lombok.AllArgsConstructor;
import mypage.data.BadgeDto;
import mypage.data.MemberDto;
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

}
