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

    //서연 작성-받는 데이터값 usercode로 통일 시키려고 만들었씀
    @Query(value = "select * from member where usercode=:usercode",nativeQuery = true)
    public  MemberDto getMemberByData(@Param("usercode") int usercode);

    @Query(value = "SELECT * FROM member WHERE type = 'user'", nativeQuery = true)
    public List<MemberDto> findAllUsers();

    @Modifying
    @Transactional
    @Query(value = "delete from member where usercode = :usercode", nativeQuery = true)
    public void deleteMember(@Param("usercode") int usercode);

    @Query(value = "select count(*) from member where nickname=:nickname",nativeQuery = true)
    public int nickNameCheck(@Param("nickname") String nickname);


}
