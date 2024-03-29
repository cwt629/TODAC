package community.board.data;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.sql.Timestamp;

public interface MainListInterface {
    int getBoardcode();
    int getCounselorcode();
    int getUsercode();
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    Timestamp getRegistereddate();
    String getNickname();
    int getVisitcount();
    String getPhoto();
    String getMybadge();
    String getTitle();
    int getCommentcount();
    int getLikecount();
}
