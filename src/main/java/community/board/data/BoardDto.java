package community.board.data;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import mypage.data.MemberDto;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.sql.Timestamp;

@Entity
@Table(name = "board")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class BoardDto {
    @Id //각 엔터티를 구별할 수 있도록 식별 아이디를 갖도록 설계
    @GeneratedValue(strategy = GenerationType.IDENTITY)//auto increment를 주기 위한거래여
    private int boardcode;


    @ManyToOne //섭 테이블에는 ManyToOne : 여러개가 생성 가능 참조한 컬럼을 통해.
    @JoinColumn(name = "usercode") //어떤 컬럼을 참조(외래키)할 지
    @OnDelete(action = OnDeleteAction.CASCADE) //부모 테이블 지우면 댓글도 삭제한다. 혹시 변경사항이 있다면 yml 야멜 파일에서 create로 바꾸고 실행해야 된다 ~~
    private MemberDto member;

    @Column(length = 20)
    private String category;

    @Column(length = 100)
    private String title;

    @Column(length = 1000)
    private String content;

    @Column
    private int visitcount;

    @Column(length = 100)
    private String photo;

    @Column
    private int counselorcode;

    @Column(length = 10)
    private String state;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul") //댓글 출력은 ajax로 처리하기 위해 포멧한다네요
    @Column(updatable = false) //수정 시 수정컬럼에서 제외
    @CreationTimestamp //now() 같이 현재 시간이 자동등록
    private Timestamp registereddate;
}
