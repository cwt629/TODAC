package chat.data;

import lombok.Data;
import mypage.data.MemberDto;

@Data
public class ChatInitialDto {
	private String counselorName;
	private String counselorPhoto;
	private String counselorPersonality;
	private String counselorGreeting;
	private String userPhoto;
	
	public ChatInitialDto(CounselorDto counselorDto, MemberDto memberDto) {
		counselorName = counselorDto.getName();
		counselorPhoto = counselorDto.getPhoto();
		counselorPersonality = counselorDto.getPersonality();
		counselorGreeting = counselorDto.getGreeting();
		userPhoto = memberDto.getPhoto();
	}
}
