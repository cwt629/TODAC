package community.board.data;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class BoardDetailDto {
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private Timestamp registerDate;
    private String photo;
    private String title;
    private String memberNickname;
    private String content;
    private int visitCount;
    private int counselorCode;
    private int userCode;
    private int boardCode;
    private String memberPhoto;


    public BoardDetailDto(BoardDto boardDto) {
        photo = boardDto.getPhoto();
        title = boardDto.getTitle();
        memberNickname = boardDto.getMember().getNickname();
        content = boardDto.getContent();
        visitCount = boardDto.getVisitcount();
        counselorCode = boardDto.getCounselorcode();
        registerDate = boardDto.getRegistereddate();
        userCode = boardDto.getMember().getUsercode();
        boardCode = boardDto.getBoardcode();
        memberPhoto = boardDto.getMember().getPhoto();
    }

}
