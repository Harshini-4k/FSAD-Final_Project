package backend;

import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import backend.repository.CertificationRepository;
import backend.repository.UserRepository;

@RestController
@RequestMapping("/api/certifications")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class CertificationController {

    @Autowired
    private CertificationRepository repository;

    @Autowired
    private UserRepository userRepository;

    // Get all certifications (Admin)
    @GetMapping
    public List<Certification> getAllCertifications() {
        return repository.findAll();
    }

    // Get certifications by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserCertifications(@PathVariable Long userId) {
        System.out.println("Fetching certifications for user: " + userId);
        try {
            List<Certification> certs = repository.findByUserId(userId);
            System.out.println("Found " + certs.size() + " certifications for user: " + userId);
            return ResponseEntity.ok(certs);
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // Get certifications by status
    @GetMapping("/status/{status}")
    public List<Certification> getCertificationsByStatus(@PathVariable String status) {
        return repository.findByStatus(status);
    }

    // Expiring + Active
    @GetMapping("/expiring/all")
    public ResponseEntity<?> getExpiringCertifications() {
        List<Certification> expiring = repository.findByStatus("EXPIRING_SOON");
        List<Certification> active = repository.findByStatus("ACTIVE");

        Map<String, List<Certification>> result = new HashMap<>();
        result.put("expiringCertifications", expiring);
        result.put("activeCertifications", active);

        return ResponseEntity.ok(result);
    }

    // Add certification
    @PostMapping
    public ResponseEntity<?> addCertification(@RequestBody Certification certification) {

        if (certification.getCertificationName() == null || certification.getCertificationName().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "Certification name is required"));
        }

        if (certification.getUserId() == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "User ID is required"));
        }

        try {
            Certification saved = repository.save(certification);

            return ResponseEntity.ok(
                    Map.of("success", true, "message", "Certification added successfully", "data", saved)
            );

        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // Update certification
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCertification(@PathVariable Long id, @RequestBody Certification certification) {

        Optional<Certification> existing = repository.findById(id);

        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Certification cert = existing.get();

        if (certification.getCertificationName() != null)
            cert.setCertificationName(certification.getCertificationName());

        if (certification.getOrganization() != null)
            cert.setOrganization(certification.getOrganization());

        if (certification.getCourse() != null)
            cert.setCourse(certification.getCourse());

        if (certification.getIssueDate() != null)
            cert.setIssueDate(certification.getIssueDate());

        if (certification.getExpiryDate() != null)
            cert.setExpiryDate(certification.getExpiryDate());

        if (certification.getStatus() != null)
            cert.setStatus(certification.getStatus());

        Certification updated = repository.save(cert);

        return ResponseEntity.ok(
                Map.of("success", true, "message", "Updated successfully", "data", updated)
        );
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCertification(@PathVariable Long id) {

        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);

        return ResponseEntity.ok(
                Map.of("success", true, "message", "Deleted successfully")
        );
    }

    // Suggestions
    @GetMapping("/suggestions/{userId}/{course}")
    public ResponseEntity<?> getSuggestedCertifications(@PathVariable Long userId,
                                                         @PathVariable String course) {
        try {
            List<Certification> allInCourse = repository.findByCourse(course);

            List<Certification> suggestions = allInCourse.stream()
                    .filter(cert -> !cert.getUserId().equals(userId))
                    .toList();

            return ResponseEntity.ok(suggestions);

        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // Recommended
    @GetMapping("/recommended/harshini")
    public ResponseEntity<?> getHarshiniRecommendedCertifications() {
        try {
            var harshini = userRepository.findByName("Harshini");

            if (harshini == null) {
                return ResponseEntity.ok(repository.findByUserId(1L));
            }

            List<Certification> recommendations = repository.findByUserId(harshini.getId());

            return ResponseEntity.ok(recommendations);

        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // ✅ FIXED SAMPLE DATA
    @PostMapping("/sample/init")
    public ResponseEntity<?> initializeSampleData() {

        List<Certification> samples = Arrays.asList(
                new Certification(
                        1L,
                        "AWS Certified Solutions Architect",
                        "Amazon Web Services",
                        "Cloud Computing",
                        LocalDate.parse("2022-06-15"),
                        LocalDate.parse("2025-06-15"),
                        "ACTIVE"
                ),
                new Certification(
                        1L,
                        "Google Cloud Professional",
                        "Google Cloud",
                        "Cloud Computing",
                        LocalDate.parse("2023-03-20"),
                        LocalDate.parse("2025-03-20"),
                        "EXPIRING_SOON"
                )
        );

        repository.saveAll(samples);

        return ResponseEntity.ok(
                Map.of("success", true, "message", "Sample data added")
        );
    }
}