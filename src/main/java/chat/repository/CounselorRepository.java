package chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import chat.data.CounselorDto;

public interface CounselorRepository extends JpaRepository<CounselorDto, Short> {
	
}
