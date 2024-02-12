package community.board.controller;

import community.board.data.BoardCommentDto;
import community.board.data.BoardDto;
import community.board.data.BoardListDto;
import mypage.data.MemberDto;
import mypage.repository.MemberDao;
import naver.storage.NcpObjectStorageService;
import org.springframework.web.bind.annotation.*;

import community.board.repository.BoardDao;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class BoardController {
	private final BoardDao boardDao;

	private final MemberDao memberDao;

	//storage class 선언
	private final NcpObjectStorageService storageService;

	//업로드한 파일명 저장
	String photo;

	//버켓네임 지정
	private String bucketName = "guest-hch";
	//저장할 폴더네임
	// 지정
	private String folderName = "TODAC";

	//사진만 먼저 업로드하기
	@PostMapping("/form/upload")
	public String uploadFile(@RequestParam("upload") MultipartFile upload) {
		System.out.println("upload:" + upload.getOriginalFilename());
		photo = storageService.uploadFile(bucketName, folderName, upload);
		return photo;
	}

	//단일한 dto 값을 저장하는 로직
	@PostMapping("/form/insert/{usercode}")
	public void insertBoard(@RequestBody BoardDto dto , @PathVariable("usercode") String usercode) {

		MemberDto findMember = memberDao.getMemberByID(usercode);
		dto.setMember(findMember);

		//미리 업로드한 photo 를 dto에 넣기
		dto.setPhoto(photo);
		//db insert
		boardDao.addBoard(dto);
		//photo 초기화
		photo = null;
	}

	//List 를 출력할 때 사용하는 로직
	// 화면에 필요한 데이터만 핏 하게 뿌리고싶어서 dto를 새로만듬 엔티티는 데이터의 이동 통로가 되면 안된다.
	@GetMapping("/board/list")
	public List<BoardListDto> list() {
		List<BoardDto> allBoards = boardDao.getAllBoards();
        return allBoards.stream().map(BoardListDto::new).toList();
	}

	//관리자 게시판에서 회원 게시글 출력할때 사용하는 로직
	@PostMapping("/admin/member/post")
	public List<BoardDto> getMemberPostData(@RequestParam("usercode") int usercode)
	{
		return boardDao.getMemberPostData(usercode);
	}
	
	//게시글 삭제
	@DeleteMapping("/post/delete")
	public void delete(@RequestParam("boardcode") int boardcode)
	{
		boardDao.deletePost(boardcode);
	}
	
	//관리자 게시판에서 회원 댓글 출력할때 사용하는 로직
	@PostMapping("/admin/member/comment")
	public List<BoardCommentDto> getMemberCommentData(@RequestParam("usercode") int usercode)
	{
		return boardDao.getMemberCommentData(usercode);
	}
	
	//게시글 댓글 삭제
	@DeleteMapping("/comment/delete")
	public void commentdelete(@RequestParam("commentcode") int commentcode)
	{
		boardDao.commentDelete(commentcode);
	}

}
