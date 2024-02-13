package chat.data;

import lombok.Data;

@Data
public class CounselorListDto {
	private Short counselorcode;
    private String name;
    private String briefintro;
    private String introduction;
    private String photo;
    private String personality;
    private String greeting;
    
    public CounselorListDto(CounselorDto counselorDto) {
    	counselorcode = counselorDto.getCounselorcode();
    	name = counselorDto.getName();
    	briefintro = counselorDto.getBriefintro();
    	introduction = counselorDto.getIntroduction();
    	photo = counselorDto.getPhoto();
    	personality = counselorDto.getPersonality();
    	greeting = counselorDto.getGreeting();
    }
}
