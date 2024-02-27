package chat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import chat.data.CounselorDetailInterface;
import chat.data.CounselorDto;

public interface CounselorRepository extends JpaRepository<CounselorDto, Short> {
	@Query(value =
			"""
			select c.counselorcode, c.usercode, c.name, c.briefintro, 
			c.introduction, c.photo, c.cardcolor,
			COUNT(w.score) as reviewcount, IFNULL(AVG(w.score), 0) as averagescore
			from counselor c
			left join chatroom r on c.counselorcode = r.counselorcode
			left join chatreview w on r.chatroomcode = w.chatroomcode
			group by c.counselorcode
			order by c.counselorcode asc
			"""
			, nativeQuery = true)
	public List<CounselorDetailInterface> getCounselorList();
	
	@Query(value =
			"""
			select c.counselorcode, c.usercode, c.name, c.briefintro, 
			c.introduction, c.photo, c.cardcolor,
			COUNT(w.score) as reviewcount, IFNULL(AVG(w.score), 0) as averagescore
			from counselor c
			left join chatroom r on c.counselorcode = r.counselorcode
			left join chatreview w on r.chatroomcode = w.chatroomcode
			where c.usercode = :usercode or c.usercode = 5
			group by c.counselorcode
			order by c.counselorcode asc
			"""
			, nativeQuery = true)
	public List<CounselorDetailInterface> getCounselorListByUser(@Param("usercode") int usercode);
}
