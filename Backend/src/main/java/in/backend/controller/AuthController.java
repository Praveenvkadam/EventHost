package in.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import in.backend.dto.AuthRequest;
import in.backend.dto.AuthResponse;
import in.backend.dto.PasswordResetRequest;
import in.backend.dto.RegisterRequest;
import in.backend.dto.ResetPasswordDTO;
import in.backend.service.UserService;

/**
 * Authentication Controller
 * Handles user registration, login, and password reset.
 * 
 * Compatible with Java 8.
 */
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Allow CORS from frontend
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        AuthResponse response = userService.register(
                request.getUsername(),
                request.getEmail(),
                request.getPhone(),
                request.getPassword()
        );
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        AuthResponse response = userService.login(request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/reset-password-request")
    public ResponseEntity<Map<String, String>> resetPasswordRequest(@RequestBody PasswordResetRequest request) {
        userService.createPasswordResetToken(request);

        Map<String, String> response = new HashMap<>();
        response.put("message", "If an account exists, a reset link has been sent.");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody ResetPasswordDTO dto) {
        Map<String, String> response = new HashMap<>();

        try {
            boolean success = userService.resetPassword(dto);

            if (success) {
                response.put("message", "Password reset successful");
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                response.put("message", "Invalid or expired token");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            response.put("message", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Get currently logged-in user info.
     * Requires authentication.
     */
    @GetMapping("/me")
    public ResponseEntity<AuthResponse> getLoggedInUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7); // Remove "Bearer "
        return ResponseEntity.ok(userService.getLoggedInUser(token));
    }
}
