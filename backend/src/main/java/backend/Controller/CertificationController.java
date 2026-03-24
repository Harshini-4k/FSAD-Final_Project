package backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certifications")
@CrossOrigin(origins = "http://localhost:3000")
public class CertificationController {

    @Autowired
    private CertificationRepository repository;

    @GetMapping
    public List<Certification> getAllCertifications() {
        return repository.findAll();
    }

    @PostMapping
    public Certification addCertification(@RequestBody Certification certification) {
        return repository.save(certification);
    }
}