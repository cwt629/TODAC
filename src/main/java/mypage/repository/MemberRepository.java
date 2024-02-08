package mypage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mypage.data.MemberDto;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<MemberDto, Integer>{
    @Query(value = "select * from member where userid=:userid",nativeQuery = true)
    public  MemberDto getMemberByID(@Param("userid") String userid);

    @Query(value = "select count(*) from member where nickname=:nickname",nativeQuery = true)
    public int nickNameCheck(@Param("nickname") String nickname);
}
