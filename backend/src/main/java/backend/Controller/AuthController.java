package backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import backend.model.User;
import backend.repository.UserRepository;
import backend.repository.CertificationRepository;

import java.util.Map;
import java.util.List;
import java.util.ArrayList;
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CertificationRepository certificationRepository;

    // ================= SIGNUP =================
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(Map.of("success", false, "message", "Email already exists"));
        }

        userRepository.save(user);

        return ResponseEntity.ok(
                Map.of("success", true, "message", "Signup successful")
        );
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req) {

        String email = req.get("email");
        String password = req.get("password");

        User user = userRepository.findByEmail(email);

        if (user == null || !user.getPassword().equals(password)) {
            return ResponseEntity.status(401)
                    .body(Map.of("success", false, "message", "Invalid credentials"));
        }

        return ResponseEntity.ok(
                Map.of(
                        "success", true,
                        "id", user.getId(),
                        "role", user.getRole(),
                        "name", user.getName(),
                        "email", user.getEmail(),
                        "message", "Login successful"
                )
        );
    }

    // ================= ADMIN ENDPOINTS =================

    // Get total number of users
    @GetMapping("/admin/users/count")
    public ResponseEntity<?> getUserCount() {
        try {
            long userCount = userRepository.count();
            return ResponseEntity.ok(Map.of("count", userCount));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to fetch user count"));
        }
    }

    // Get users with their certification counts
    @GetMapping("/admin/users/certificates")
    public ResponseEntity<?> getUsersWithCertificateCounts() {
        try {
            List<User> users = userRepository.findAll();
            List<Map<String, Object>> result = new ArrayList<>();

            for (User user : users) {
                long certCount = certificationRepository.countByUserId(user.getId());
                Map<String, Object> userData = Map.of(
                    "id", user.getId(),
                    "name", user.getName(),
                    "email", user.getEmail(),
                    "role", user.getRole(),
                    "certificateCount", certCount
                );
                result.add(userData);
            }

            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Failed to fetch user certificate data"));
        }
    }
}