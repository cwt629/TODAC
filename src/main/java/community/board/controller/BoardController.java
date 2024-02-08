package community.board.controller;

import community.board.data.BoardDto;
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

	//storage class 선언
	private final NcpObjectStorageService storageService;

	//업로드한 파일명 저장
	String photo;

	//버켓네임 지정
	private String bucketName = "guest-hch";
	//저장할 폴더네임 지정
	private String folderName = "TODAC";

	//사진만 먼저 업로드하기
	@PostMapping("/form/upload")
	public String uploadFile(@RequestParam("upload") MultipartFile upload) {
		System.out.println("upload:" + upload.getOriginalFilename());
		photo = storageService.uploadFile(bucketName, folderName, upload);
		return photo;
	}

	//단일한 dto 값을 저장하는 로직
	@PostMapping("/form/insert")
	public void insertBoard(@RequestBody BoardDto dto) {
		//미리 업로드한 photo 를 dto에 넣기
		dto.setPhoto(photo);
		//db insert
		boardDao.addBoard(dto);
		//photo 초기화
		photo = null;
	}

	//List 를 출력할 때 사용하는 로직
	@GetMapping("/board/list")
	public List<BoardDto> list() {
		return boardDao.getAllBoards();
	}
	
	//관리자 게시판에서 회원 게시글 출력할때 사용하는 로직
	@PostMapping("/admin/member/post")
	public BoardDto getMemberPostData(@RequestParam("usercode") int usercode)
	{
		return boardDao.getMemberPostData(usercode);
	}
	
}
