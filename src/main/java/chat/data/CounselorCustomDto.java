package chat.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CounselorCustomDto {
	private int usercode;
	private String name;
	private String briefintro;
	private String introduction;
	private String personality;
	private String greeting;
	private String cardcolor;
}
