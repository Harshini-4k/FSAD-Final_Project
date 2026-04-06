package backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import backend.model.User;
import backend.repository.UserRepository;

import java.util.Map;
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class AuthController {

    @Autowired
    private UserRepository userRepository;

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
}