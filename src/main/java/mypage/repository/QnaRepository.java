package mypage.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import mypage.data.QnaDto;

public interface QnaRepository extends JpaRepository<QnaDto, Integer>{
	
}
