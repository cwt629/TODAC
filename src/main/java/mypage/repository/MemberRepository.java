package mypage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import mypage.data.MemberDto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.transaction.Transactional;

import java.lang.reflect.Member;
import java.util.List;

public interface MemberRepository extends JpaRepository<MemberDto, Integer>{

    @Query(value = "select * from member where userid=:userid",nativeQuery = true)
    public  MemberDto getMemberByID(@Param("userid") String userid);

    @Modifying
    @Transactional
    @Query(value = "delete from member where userid = :userid", nativeQuery = true)
    public void deleteMember(@Param("userid") String userid);

    @Query(value = "select count(*) from member where nickname=:nickname",nativeQuery = true)
    public int nickNameCheck(@Param("nickname") String nickname);


}
