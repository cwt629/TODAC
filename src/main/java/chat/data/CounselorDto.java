package chat.data;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import mypage.data.MemberDto;

@Entity
@Table(name = "counselor")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CounselorDto {
    @Id //각 엔터티를 구별할 수 있도록 식별 아이디를 갖도록 설계
    @GeneratedValue(strategy = GenerationType.IDENTITY)//auto increment를 주기 위한거래여
    private Short counselorcode;
    
    @ManyToOne
    @JoinColumn(name = "usercode")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private MemberDto member;

    @Column(length = 20)
    private String name;

    @Column(length = 30)
    private String briefintro;

    @Column(length = 300)
    private String introduction;

    @Column(length = 100)
    private String photo;

    @Column(length = 60)
    private String personality;
    
    @Column(length = 60)
    private String greeting;
    
    @Column(length = 20)
    private String cardcolor;
}
