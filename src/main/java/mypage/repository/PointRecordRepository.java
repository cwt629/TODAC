package mypage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import community.board.data.BoardCommentDto;
import mypage.data.PointRecordDto;

public interface PointRecordRepository extends JpaRepository<PointRecordDto, Integer>{
	
	// type이 '충전'일 때의 레코드를 조회
    @Query(value = "SELECT * FROM pointrecord WHERE usercode = :usercode AND type = '충전'", nativeQuery = true)
    public List<PointRecordDto> getMemberPayment(@Param("usercode") int usercode);
    
	@Query(value = "select * from pointrecord where usercode=:usercode",nativeQuery = true)
	public List<PointRecordDto> getMemberPoint(@Param("usercode") int usercode);

}
