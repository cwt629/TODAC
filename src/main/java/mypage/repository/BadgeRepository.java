package mypage.repository;

import jakarta.transaction.Transactional;
import mypage.data.BadgeDto;
import mypage.data.MemberDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface BadgeRepository extends JpaRepository<BadgeDto, Integer>{

    @Query(value = "SELECT COUNT(*) FROM board WHERE usercode=:usercode",nativeQuery = true)
    public int writeBoardCount(@Param("usercode") int usercode);

    @Query(value = "select count(*) from badge where achievename=:achievename and usercode=:usercode",nativeQuery = true)
    public int checkAchivename(@Param("usercode") int usercode, @Param("achievename") String achievename);

    @Query(value = "select * from badge where usercode=:usercode",nativeQuery = true)
    public List<BadgeDto> getAchiveList(@Param("usercode") int usercode);
}
