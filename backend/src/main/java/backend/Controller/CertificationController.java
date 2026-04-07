package backend;

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
            System.err.println("Error fetching user certifications: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Error fetching certifications: " + e.getMessage()));
        }
    }

    // Get all certifications by status
    @GetMapping("/status/{status}")
    public List<Certification> getCertificationsByStatus(@PathVariable String status) {
        return repository.findByStatus(status);
    }

    // Get expiring soon certifications
    @GetMapping("/expiring/all")
    public ResponseEntity<?> getExpiringCertifications() {
        List<Certification> expiring = repository.findByStatus("EXPIRING_SOON");
        List<Certification> active = repository.findByStatus("ACTIVE");
        Map<String, List<Certification>> result = new HashMap<>();
        result.put("expiringCertifications", expiring);
        result.put("activeCertifications", active);
        return ResponseEntity.ok(result);
    }

    // Add new certification
    @PostMapping
    public ResponseEntity<?> addCertification(@RequestBody Certification certification) {
        System.out.println("Adding certification: " + certification.getCertificationName() + " for user: " + certification.getUserId());
        
        if (certification.getCertificationName() == null || certification.getCertificationName().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Certification name is required"));
        }
        
        if (certification.getUserId() == null) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "User ID is required"));
        }

        try {
            Certification saved = repository.save(certification);
            System.out.println("Certification saved successfully with ID: " + saved.getId());
            return ResponseEntity.ok(Map.of("success", true, "message", "Certification added successfully", "data", saved));
        } catch (Exception e) {
            System.err.println("Error saving certification: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Error saving certification: " + e.getMessage()));
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
        if (certification.getCertificationName() != null) {
            cert.setCertificationName(certification.getCertificationName());
        }
        if (certification.getOrganization() != null) {
            cert.setOrganization(certification.getOrganization());
        }
        if (certification.getCourse() != null) {
            cert.setCourse(certification.getCourse());
        }
        if (certification.getIssueDate() != null) {
            cert.setIssueDate(certification.getIssueDate());
        }
        if (certification.getExpiryDate() != null) {
            cert.setExpiryDate(certification.getExpiryDate());
        }
        if (certification.getStatus() != null) {
            cert.setStatus(certification.getStatus());
        }

        Certification updated = repository.save(cert);
        return ResponseEntity.ok(Map.of("success", true, "message", "Certification updated successfully", "data", updated));
    }

    // Delete certification
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCertification(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.ok(Map.of("success", true, "message", "Certification deleted successfully"));
    }

    // Get suggested certifications by course (excluding user's own)
    @GetMapping("/suggestions/{userId}/{course}")
    public ResponseEntity<?> getSuggestedCertifications(@PathVariable Long userId, @PathVariable String course) {
        try {
            List<Certification> allInCourse = repository.findByCourse(course);
            List<Certification> suggestions = allInCourse.stream()
                .filter(cert -> !cert.getUserId().equals(userId))
                .toList();
            return ResponseEntity.ok(suggestions);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Error fetching suggestions: " + e.getMessage()));
        }
    }

    // Get all recommended certifications from Harshini user
    @GetMapping("/recommended/harshini")
    public ResponseEntity<?> getHarshiniRecommendedCertifications() {
        try {
            var harshini = userRepository.findByName("Harshini");
            if (harshini == null) {
                // Fallback to userId 1 if the Harshini user record is not present in the database
                return ResponseEntity.ok(repository.findByUserId(1L));
            }
            List<Certification> recommendations = repository.findByUserId(harshini.getId());
            return ResponseEntity.ok(recommendations);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Error fetching recommended certifications: " + e.getMessage()));
        }
    }

    // Add sample data
    @PostMapping("/sample/init")
    public ResponseEntity<?> initializeSampleData() {
        List<Certification> samples = Arrays.asList(
            new Certification(1L, "AWS Certified Solutions Architect", "Amazon Web Services", "Cloud Computing", "2022-06-15", "2025-06-15", "ACTIVE"),
            new Certification(1L, "Google Cloud Professional", "Google Cloud", "Cloud Computing", "2023-03-20", "2025-03-20", "EXPIRING_SOON"),
            new Certification(1L, "Microsoft Azure Administrator", "Microsoft", "Cloud Computing", "2021-12-10", "2024-12-10", "EXPIRED"),
            new Certification(2L, "AWS Certified Developer", "Amazon Web Services", "Cloud Computing", "2023-08-10", "2026-08-10", "ACTIVE"),
            new Certification(3L, "Google Cloud Architect", "Google Cloud", "Cloud Computing", "2022-11-15", "2025-11-15", "ACTIVE"),
            new Certification(2L, "Java Professional Developer", "Oracle", "Programming", "2023-09-05", "2025-09-05", "ACTIVE"),
            new Certification(3L, "Python Developer Certification", "Python Institute", "Programming", "2023-05-20", "2026-05-20", "ACTIVE"),
            new Certification(1L, "JavaScript Developer", "Mozilla", "Programming", "2024-01-10", "2027-01-10", "ACTIVE"),
            new Certification(2L, "Kubernetes Administrator", "Linux Foundation", "DevOps", "2023-01-30", "2025-01-30", "EXPIRING_SOON"),
            new Certification(3L, "Docker Certified Associate", "Docker", "DevOps", "2023-07-15", "2026-07-15", "ACTIVE"),
            new Certification(1L, "Jenkins CI/CD", "CloudBees", "DevOps", "2023-12-05", "2026-12-05", "ACTIVE"),
            new Certification(1L, "CompTIA Security+", "CompTIA", "Cybersecurity", "2023-11-20", "2026-11-20", "ACTIVE"),
            new Certification(2L, "CISSP Certification", "ISC2", "Cybersecurity", "2022-05-12", "2025-05-12", "ACTIVE"),
            new Certification(3L, "Certified Ethical Hacker", "EC-Council", "Cybersecurity", "2023-09-30", "2026-09-30", "ACTIVE")
        );

        repository.saveAll(samples);
        return ResponseEntity.ok(Map.of("success", true, "message", "Sample data initialized", "count", samples.size()));
    }
}