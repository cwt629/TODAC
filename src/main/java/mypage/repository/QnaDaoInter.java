package mypage.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mypage.data.QnaDto;

public interface QnaDaoInter extends JpaRepository<QnaDto, Integer>{
	
}