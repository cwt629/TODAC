package chat.data;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CounselorDetailDto {
	private Short counselorcode;
	private String name;
	private String briefintro;
	private String introduction;
	private String photo;
	private int reviewcount;
	private double averagescore;
}
