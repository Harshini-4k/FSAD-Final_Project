package backend;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Certification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String certificationName;
    private String organization;
    private String course;
    private LocalDate issueDate;     // ✅ FIXED
    private LocalDate expiryDate;    // ✅ FIXED
    private String status;

    private String certificateFile;

    public Certification() {}

    // ✅ FIXED CONSTRUCTOR
    public Certification(Long userId, String certificationName, String organization,
                         String course, LocalDate issueDate, LocalDate expiryDate, String status) {
        this.userId = userId;
        this.certificationName = certificationName;
        this.organization = organization;
        this.course = course;
        this.issueDate = issueDate;
        this.expiryDate = expiryDate;
        this.status = status;
    }

    public Long getId() { return id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getCertificationName() { return certificationName; }
    public void setCertificationName(String certificationName) { this.certificationName = certificationName; }

    public String getOrganization() { return organization; }
    public void setOrganization(String organization) { this.organization = organization; }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    // ✅ FIXED GETTERS/SETTERS
    public LocalDate getIssueDate() { return issueDate; }
    public void setIssueDate(LocalDate issueDate) { this.issueDate = issueDate; }

    public LocalDate getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getCertificateFile() { return certificateFile; }
    public void setCertificateFile(String certificateFile) { this.certificateFile = certificateFile; }
}