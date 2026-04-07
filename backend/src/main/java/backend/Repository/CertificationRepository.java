package backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import backend.Certification;
import java.util.List;

public interface CertificationRepository extends JpaRepository<Certification, Long> {
    List<Certification> findByUserId(Long userId);
    List<Certification> findByStatus(String status);
    List<Certification> findByCourse(String course);
    long countByUserId(Long userId);
}