package chat.data;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChatLogPageDto {
	private String counselorname;
	private List<ChatLogInfoDto> log;
	private int diagnosisCount;
}
