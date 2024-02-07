package login.repository;

import mypage.data.MemberDto;
import org.springframework.data.jpa.repository.JpaRepository;


public interface LoginDao extends JpaRepository<MemberDto, Integer> {
    MemberDto findByUserid(String userid);
    
}