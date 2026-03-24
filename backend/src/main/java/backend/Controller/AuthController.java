package com.certitracker.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.certitracker.backend.model.User;
import com.certitracker.backend.repository.UserRepository;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000") // allow React frontend
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // =================== SIGNUP ===================
       @PostMapping("/signup")
       public ResponseEntity<?> signup(@RequestBody User user) {
    System.out.println("Signup request received: " + user.getName() + ", " + user.getEmail() + ", " + user.getRole());

    if (userRepository.existsByEmail(user.getEmail())) {
        return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Email already exists"));
    }

    userRepository.save(user);
    return ResponseEntity.ok(Map.of("success", true, "message", "Signup successful"));
   }

    // =================== LOGIN ===================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req) {
        try {
            String email = req.get("email");
            String password = req.get("password");

            User user = userRepository.findByEmail(email);
            if (user == null || !user.getPassword().equals(password)) {
                return ResponseEntity.status(401)
                        .body(Map.of("success", false, "message", "Invalid credentials"));
            }

            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "role", user.getRole(),
                    "name", user.getName()
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500)
                    .body(Map.of("success", false, "message", "Login failed. Please try again."));
        }
    }
}