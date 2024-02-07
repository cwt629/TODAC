package mypage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mypage.data.MemberDto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.lang.reflect.Member;
import java.util.List;

public interface MemberDaoInter extends JpaRepository<MemberDto, Integer>{
	
    @Query(value = "select * from member where userid=:userid",nativeQuery = true)
    public  MemberDto getMemberlist(@Param("userid") String userid);
}
