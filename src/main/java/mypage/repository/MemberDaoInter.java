package mypage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mypage.data.MemberDto;

public interface MemberDaoInter extends JpaRepository<MemberDto, Integer>{
}
