package chat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import chat.data.ChatListInterface;
import chat.data.ChatRoomDto;

public interface ChatRoomRepository extends JpaRepository<ChatRoomDto, Short> {
	@Query(value = 
			"""
			select r.chatroomcode, s.publisheddate as date, c.name as counselorname
			from chatroom r
			left join counselor c on r.counselorcode = c.counselorcode
			left join chatsummary s on r.chatroomcode = s.chatroomcode
			where r.usercode = :usercode
			""", nativeQuery = true)
	public List<ChatListInterface> getChatroomsOfMember(@Param("usercode") int usercode);
	
	@Query(value = "select name from counselor natural join chatroom where chatroomcode = :chatroomcode"
			, nativeQuery = true)
	public String getCounselorNameInRoom(@Param("chatroomcode") Short chatroomcode);
	
	@Query(value = "select photo from member natural join chatroom where chatroomcode = :chatroomcode"
			, nativeQuery = true)
	public String getMemberPhotoInRoom(@Param("chatroomcode") Short chatroomcode);
	
	@Query(value = "select usercode from member natural join chatroom where chatroomcode = :chatroomcode"
			, nativeQuery = true)
	public String getMemberUsercodeInRoom(@Param("chatroomcode") Short chatroomcode);
	
}
