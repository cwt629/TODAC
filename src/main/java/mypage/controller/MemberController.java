package mypage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import mypage.data.MemberDto;
import mypage.repository.MemberDao;
import naver.storage.NcpObjectStorageService;

@RestController
@RequiredArgsConstructor
public class MemberController {
	@Autowired
	private final MemberDao memberDao;
    @Autowired
    private final NcpObjectStorageService storageService;
    private String bucketName = "guest-hch";  // 버켓네임 지정
    private String folderName = "TODAC";       // 저장할 폴더네임 지정

    
    @PostMapping("/admin/memberlist")
    public Map<String,Object> memberList()
    {
    	Map<String, Object> map=new HashMap<>();
    	List<MemberDto> user = memberDao.getAllMember();
    	map.put("user",user);
    	return map;
    }
    
    //나혜 작성중
    @PostMapping("/login/signupinsert")
    public Map<String, Object> insert(@RequestBody MemberDto dto) throws Exception {
    	Map<String, Object> retMap = new HashMap<String, Object>();
    	
        
//            // 이미지 URL에서 파일명 추출, @RequestParam("upload") MultipartFile upload
//            String fileName = getFileNameFromUrl(dto.getPhoto());
//            // 이미지를 스토리지에 저장 후 저장된 파일명 반환
//            String photo = saveImageToStorage(dto.getPhoto(), fileName);
//            // dto에 사진 파일명 저장
//            dto.setPhoto(photo);
//            // db insert
        	
    	//System.out.println(" ================== insert content : " + dto);
        memberDao.insertMember(dto);
        
        retMap.put("result", "success");
        //System.out.println(" =========================== : retMap : " + retMap);
        
        return retMap;
    }

//    // 이미지 URL에서 파일명 추출
//    private String getFileNameFromUrl(String imageUrl) {
//        try {
//            URL url = new URL(imageUrl);
//            String[] pathSegments = url.getPath().split("/");
//            return pathSegments[pathSegments.length - 1];
//        } catch (Exception e) {
//            throw new RuntimeException("Failed to extract filename from URL", e);
//        }
//    }
//
//    // 이미지를 스토리지에 저장 후 저장된 파일명 반환
//    private String saveImageToStorage(String imageUrl, String fileName) throws IOException {
//        //Path tempFile = Files.createTempFile("temp-", "-" + fileName);
//        //Files.copy(new URL(imageUrl).openStream(), tempFile, StandardCopyOption.REPLACE_EXISTING);
//    	byte[] imageBytes = downloadImage(imageUrl);
//    	MultipartFile file = convertToMultipartFile(imageBytes, "image.jpg");
//        //return storageService.uploadFile(bucketName, folderName, Files.readAllBytes(tempFile));
//    	return storageService.uploadFile(bucketName, folderName, file);
//    }
//    
//    private static MultipartFile downloadAndConvertToMultipartFile(String imageUrl) throws IOException {
//        // 이미지 다운로드
//        byte[] imageBytes = downloadImage(imageUrl);
//
//        // 이미지를 MultipartFile로 변환
//        return convertToMultipartFile(imageBytes, "image.jpg");
//    }
//
//    private static byte[] downloadImage(String imageUrl) throws IOException {
//        URL url = new URL(imageUrl);
//        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//
//        // 타임아웃 설정
//        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
//        factory.setConnectTimeout(5000);
//        factory.setReadTimeout(5000);
//        connection.setRequestMethod("GET");
//        connection.setDoOutput(true);
//
//        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
//        byte[] buffer = new byte[4096];
//        int bytesRead;
//
//        while ((bytesRead = connection.getInputStream().read(buffer)) != -1) {
//            outputStream.write(buffer, 0, bytesRead);
//        }
//
//        connection.disconnect();
//        return outputStream.toByteArray();
//    }
//
//    private static MultipartFile convertToMultipartFile(byte[] content, String fileName) {
//        MultiValueMap<String, Object> parts = new LinkedMultiValueMap<>();
//        parts.add("file", new ByteArrayResource(content) {
//            @Override
//            public String getFilename() {
//                return fileName;
//            }
//        });
//
//        return (MultipartFile) parts.getFirst("file");
//    }
}