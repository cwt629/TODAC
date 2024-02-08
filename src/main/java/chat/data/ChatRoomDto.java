package chat.data;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import mypage.data.MemberDto;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "chatroom")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomDto {
    @Id //각 엔터티를 구별할 수 있도록 식별 아이디를 갖도록 설계
    @GeneratedValue(strategy = GenerationType.IDENTITY)//auto increment를 주기 위한거래여
    private Short chatroomcode;

    @ManyToOne //섭 테이블에는 ManyToOne : 여러개가 생성 가능 참조한 컬럼을 통해.
    @JoinColumn(name = "counselorcode") //어떤 컬럼을 참조(외래키)할 지
    @OnDelete(action = OnDeleteAction.CASCADE) //부모 테이블 지우면 댓글도 삭제한다. 혹시 변경사항이 있다면 yml 야멜 파일에서 create로 바꾸고 실행해야 된다 ~~
    private CounselorDto counselor;

    @ManyToOne //섭 테이블에는 ManyToOne : 여러개가 생성 가능 참조한 컬럼을 통해.
    @JoinColumn(name = "usercode") //어떤 컬럼을 참조(외래키)할 지
    @OnDelete(action = OnDeleteAction.CASCADE) //부모 테이블 지우면 댓글도 삭제한다. 혹시 변경사항이 있다면 yml 야멜 파일에서 create로 바꾸고 실행해야 된다 ~~
    private MemberDto member;
}
