package mypage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import community.board.data.BoardCommentDto;
import mypage.data.PointRecordDto;

public interface PointRecordRepository extends JpaRepository<PointRecordDto, Integer>{
	@Query(value = "select * from pointrecord where usercode=:usercode",nativeQuery = true)
	public List<PointRecordDto> getMemberPayment(@Param("usercode") int usercode);

}
