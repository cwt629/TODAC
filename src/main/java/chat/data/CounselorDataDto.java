package chat.data;

import lombok.Data;

@Data
public class CounselorDataDto {
	private String name;
	private String photo;
	private String personality;
	private String greeting;
	
	public CounselorDataDto(CounselorDto counselorDto) {
		name = counselorDto.getName();
		photo = counselorDto.getPhoto();
		personality = counselorDto.getPersonality();
		greeting = counselorDto.getGreeting();
	}
}
