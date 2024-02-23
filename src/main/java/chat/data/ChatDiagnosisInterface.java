package chat.data;

import java.sql.Timestamp;

public interface ChatDiagnosisInterface {
	Short getChatroomcode();
	int getDiagnosiscode();
	Timestamp getPublisheddate();
	String getAdvice();
	String getDeepanswer();
	int getUsercode();
}
