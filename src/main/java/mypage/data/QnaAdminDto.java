package mypage.data;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class QnaAdminDto {
	private int inquirycode;
	private String title;
	private String inquiry;
	private String answer;
	private String memberNickname;
	private String memberPhoto;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
	private Timestamp registereddate;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
	private Timestamp answereddate;
	
	public QnaAdminDto(QnaDto qnaDto) {
		inquirycode = qnaDto.getInquirycode();
		title = qnaDto.getTitle();
		inquiry = qnaDto.getInquiry();
		answer = qnaDto.getAnswer();
		memberNickname = qnaDto.getMember().getNickname();
		memberPhoto = qnaDto.getMember().getPhoto();
		registereddate = qnaDto.getRegistereddate();
		answereddate = qnaDto.getAnswereddate();
	}
}
