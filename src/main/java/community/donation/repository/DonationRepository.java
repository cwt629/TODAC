package community.donation.repository;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import jakarta.transaction.Transactional;
import mypage.data.PointRecordDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

//@Query : repository에 원하는 쿼리를 작성하게 해주는 어노테이션
//value 속성 : 쿼리 작성부
//nativeQuery : JPA 에서 지정한 규칙을 모두 무시할 수 있는 속성
//@Modifying 은 insert, update, delete 뿐만 아니라 DDL 구문을 사용할 때도 표기를 해줘야 합니다
//@Transactional 은 update, delete 를 할 때 표기를 해줘야 정상 실행이 됩니다
//public 은 적어도되고 안적어도 됨
public interface DonationRepository extends JpaRepository<PointRecordDto, Integer> {

	@Query(value = "select sum(amount) from pointrecord where type='후원'",nativeQuery = true)
    public  int getTotalDonation();

    @Query(value = "SELECT usercode, SUM(amount) AS total_amount\n" +
            "FROM pointrecord\n" +
            "WHERE type = '후원'\n" +
            "GROUP BY usercode\n" +
            "ORDER BY total_amount DESC\n" +
            "LIMIT 3;\n",nativeQuery = true)
    public Map<Object, JsonAutoDetect.Value> getTop3UserDonation();
}
