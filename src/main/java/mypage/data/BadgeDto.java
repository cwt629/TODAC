package mypage.data;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.*;

import java.sql.Timestamp;

@Entity
@Table(name = "badge")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@DynamicInsert // default 설정된 컬럼에 아무것도 안넣었을때 자동으로 defalt값이 들어가게 하기 위한 어노테이션 추가욤
public class BadgeDto {
    @Id //각 엔터티를 구별할 수 있도록 식별 아이디를 갖도록 설계
    @GeneratedValue(strategy = GenerationType.IDENTITY)//auto increment를 주기 위한거래여
    private int achievecode;

    @ManyToOne //섭 테이블에는 ManyToOne : 여러개가 생성 가능 참조한 컬럼을 통해.
    @JoinColumn(name = "usercode") //어떤 컬럼을 참조(외래키)할 지
    @OnDelete(action = OnDeleteAction.CASCADE) //부모 테이블 지우면 댓글도 삭제한다. 혹시 변경사항이 있다면 yml 야멜 파일에서 create로 바꾸고 실행해야 된다 ~~
    private MemberDto member;

    @Column(length = 50)
    private String achievename;

    @JsonFormat(pattern = "yyyy-MM-dd",timezone = "Asia/Seoul") //댓글 출력은 ajax로 처리하기 위해 포멧한다네요
    @Column(updatable = false) //수정 시 수정컬럼에서 제외
    @CreationTimestamp //now() 같이 현재 시간이 자동등록
    private Timestamp achieveddate;

}
