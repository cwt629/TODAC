package mypage.repository;

import org.springframework.stereotype.Repository;

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
		qnaRepo.save(dto);//save는 dto에 num값이 포함되어 있으면 update, 없으면 insert를 실행함
	}
}
