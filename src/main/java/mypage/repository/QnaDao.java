package mypage.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import community.board.data.BoardDto;
import lombok.AllArgsConstructor;
import mypage.data.QnaDto;

@Repository
@AllArgsConstructor
public class QnaDao {

	//jpaRepository를 상속받을 경우, 기본적인 sql을 실행시켜주는 각종메서드 호출가능
	QnaRepository qnaRepo;

	//db저장
	public void insertQna(QnaDto dto)
	{
		qnaRepo.save(dto);//save는 dto에 inquirycode값이 포함되어 있으면 update, 없으면 insert를 실행함
	}

	//전체출력
	public List<QnaDto> getAllQna()
	{
		return qnaRepo.findAll();
	}
	
	//admin qna list출력 (승민이 보드 dao참조)
    public List<QnaDto> getAllInquiry() {
        return qnaRepo.findAll();
    }
	
	public QnaDto getSelectQnaData(int inquirycode)
	{
		System.out.println("getSelectQnaData 메서드 호출됨. inquirycode: " + inquirycode);
		return qnaRepo.getReferenceById(inquirycode);
	}
	
	public List<QnaDto> getQnaByCode(int usercode)
	{
		return qnaRepo.getQnaByCode(usercode);
	}
	
	public void addAnswer(QnaDto dto)
	{
		qnaRepo.save(dto);
	}
}
