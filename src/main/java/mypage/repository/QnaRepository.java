package mypage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import jakarta.transaction.Transactional;
import mypage.data.MemberDto;
import mypage.data.QnaDto;

public interface QnaRepository extends JpaRepository<QnaDto, Integer>{
	@Query(value = "select * from qna where usercode=:usercode",nativeQuery = true)
    public  List<QnaDto> getQnaByCode(@Param("usercode") int usercode);
	
	@Query(value = "update qna set answer = :#{#dto.answer}, answereddate = now() where inquirycode = :#{#dto.inquirycode}"
			, nativeQuery = true)
	@Modifying
	@Transactional
	public void insertAnswer(@Param("dto") QnaDto dto);
}
