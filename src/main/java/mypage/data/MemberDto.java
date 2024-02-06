package mypage.data;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "member")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberDto {
    @Id //각 엔터티를 구별할 수 있도록 식별 아이디를 갖도록 설계
    @GeneratedValue(strategy = GenerationType.IDENTITY)//auto increment를 주기 위한거래여
    private int usercode;

    @Column(length = 150)
    private String userid;

    @Column(length = 20)
    private String pass;

    @Column(length = 20)
    private String nickname;

    @Column(length = 100)
    private String photo;

    @Column(length = 10)
    private String type;

    @Column
    private int point;

    @Column(length = 100)
    private String address;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul") //댓글 출력은 ajax로 처리하기 위해 포멧한다네요
    @Column(updatable = false) //수정 시 수정컬럼에서 제외
    @CreationTimestamp //now() 같이 현재 시간이 자동등록
    private Timestamp registereddate;
}
