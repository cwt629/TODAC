package chat.data;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChatLogInfoDto {
	private String profilephoto;
	private Short speaker;
	private String content;
}
