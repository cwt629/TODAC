package chat.data;

import java.sql.Timestamp;

public interface ChatListInterface {
	Short getChatroomcode();
	Timestamp getDate();
	String getCounselorname();
	String getCounselorphoto();
}
