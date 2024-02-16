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
}
