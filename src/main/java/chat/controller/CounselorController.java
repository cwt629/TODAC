package chat.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import chat.data.CounselorCustomDto;
import chat.data.CounselorDetailInterface;
import chat.data.CounselorDto;
import chat.service.CounselorService;
import lombok.RequiredArgsConstructor;
import mypage.data.MemberDto;
import mypage.repository.MemberDao;
import naver.storage.NcpObjectStorageService;


@RestController
@RequiredArgsConstructor
public class CounselorController {
	private final CounselorService counselorService;
	private final MemberDao memberDao;
	
	private final NcpObjectStorageService storageService;
	
	private String bucketName = "guest-hch";
	private String folderName = "TODAC/counselors";
	
	private String defaultPhotoName = "default_profile_photo_blue.jpg";

	@GetMapping("counselor/list")
	public List<CounselorDetailInterface> getList(){
		return counselorService.getCounselorList();
	}
	
	@GetMapping("counselor/mylist")
	public List<CounselorDetailInterface> getListByUser(@RequestParam("usercode") int usercode){
		return counselorService.getCounselorListByUser(usercode);
	}
	
	@PostMapping("counselor/custom")
	public void insertCounselor(@ModelAttribute CounselorCustomDto dto, @RequestParam(value = "upload", required = false) MultipartFile upload) {
		// 1. 이미지 파일 업로드하여 이름 얻기 - 이미지가 없으면 기본 이미지 이름으로 남긴다
		String photoName = defaultPhotoName;
		if (upload != null)
			photoName = storageService.uploadFile(bucketName, folderName, upload);
		
		// 2. Dto를 만든다
		MemberDto memberDto = memberDao.getMemberByData(dto.getUsercode());
		CounselorDto counselorDto = CounselorDto.builder()
				.member(memberDto)
				.name(dto.getName())
				.briefintro(dto.getBriefintro())
				.introduction(dto.getIntroduction())
				.photo(photoName)
				.personality(dto.getPersonality())
				.greeting(dto.getGreeting())
				.cardcolor(dto.getCardcolor())
				.build();
		
		// 3. DB 저장
		counselorService.insertCounselor(counselorDto);
	}
	
	@GetMapping("counselor/delete")
	public void deleteCounselor(@RequestParam("counselorcode") Short counselorcode) {
		// 해당하는 dto 받기
		CounselorDto dto = counselorService.getCounselorByCode(counselorcode);
		// 파일 이름 받기
		String photo = dto.getPhoto();
		// 파일이 디폴트가 아닌 다른 이미지라면, 스토리지에서 이를 먼저 삭제해준다
		if (!photo.equals(defaultPhotoName)) {
			storageService.deleteFile(bucketName, folderName, photo);
		}
		
		counselorService.deleteCounselor(counselorcode);
	}
	
	@GetMapping("counselor/namecheck")
	public boolean checkCounselorRedundancy(@RequestParam("usercode") int usercode, @RequestParam(value = "name", defaultValue = "") String name) {
		return (counselorService.getCounselorCount(usercode, name) > 0);
	}
}
