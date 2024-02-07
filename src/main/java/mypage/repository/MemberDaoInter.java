package mypage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import mypage.data.MemberDto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.lang.reflect.Member;
import java.util.List;

public interface MemberDaoInter extends JpaRepository<MemberDto, Integer>{
	
    @Query(value = "select * from member where userid=:userid",nativeQuery = true)

    public MemberDto getMemberlist(@Param("userid") String userid);
    
    @Modifying
    @Query(value = "delete from member where userid = :userid", nativeQuery = true)
    void deleteMember(@Param("userid") String userid);

    public  MemberDto getMemberByID(@Param("userid") String userid);

}
