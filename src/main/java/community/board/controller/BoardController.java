package community.board.controller;

import community.board.data.BoardCommentDto;
import community.board.data.BoardDetailDto;
import community.board.data.BoardDto;
import community.board.data.BoardListDto;
import mypage.data.MemberDto;
import mypage.repository.MemberDao;
import naver.storage.NcpObjectStorageService;
import org.springframework.web.bind.annotation.*;

import community.board.repository.BoardDao;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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

	//특정 boardcode 의 조회수와 페이지번호 boardDetailDto mapping
	@GetMapping("/board/detail")
	public BoardDetailDto selectPage(@RequestParam("boardcode") int boardcode) {
		// 조회수
		boardDao.updateReadcount(boardcode);

		// 페이지번호
		BoardDto board = boardDao.getSelectPage(boardcode);

		// BoardDto 를 BoardDetailDto 로 Mapping
		BoardDetailDto boardDetailDto = new BoardDetailDto(board);

		return boardDetailDto;
	}

	//dto 반환
	@GetMapping("/board/select")
	public BoardDto select(@RequestParam("boardcode") int boardcode)
	{
		System.out.println("select>>"+boardcode);
		return boardDao.getSelectData(boardcode);
	}

	//수정
	@PostMapping("/board/update")
	public void update(@RequestBody BoardDto boardDto)
	{
		System.out.println("update>>"+boardDto);
		boardDao.updateBoard(boardDto);
	}


	//관리자 게시판에서 회원 게시글 출력할때 사용하는 로직
	@PostMapping("/admin/member/post")
	public List<BoardDto> getMemberPostData(@RequestParam("usercode") int usercode)
	{
		return boardDao.getMemberPostData(usercode);
	}

	//게시글 삭제 [2024-02-16] 승민 수정
	@DeleteMapping("/post/delete")
	public void delete(@RequestParam("boardcode") int boardcode) {
		// 사진 URL을 포함한 게시물 정보를 검색
		BoardDto board = boardDao.getSelectPage(boardcode);

		if (board != null) {
			// 검색된 게시물에서 사진 URL을 얻기
			String boardphoto = board.getPhoto();

			// 데이터베이스에서 게시물 삭제
			boardDao.deletePost(boardcode);

			// 사진 URL이 null이 아니고 비어 있지 않은지 확인하고 스토리지에서 해당 사진 삭제
			if (boardphoto != null && !boardphoto.isEmpty()) {
				// 스토리지 서비스를 사용하여 스토리지에서 사진 삭제
				storageService.deleteFile(bucketName, folderName, boardphoto);
			}
		}
	}



}
