package community.board.data;


import com.amazonaws.services.ec2.model.Storage;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class BoardListDto {
    private String title;
    private String memberNickname;
    private Timestamp registerDate;
    private String photo;
    //생성자 직접 만들기 나중에 지원하는 annotation 으로 변경
    public BoardListDto(BoardDto boardDto) {
        photo = boardDto.getPhoto();
        title = boardDto.getTitle();
        memberNickname = boardDto.getMember().getNickname();
        registerDate = boardDto.getRegistereddate();
    }
}
