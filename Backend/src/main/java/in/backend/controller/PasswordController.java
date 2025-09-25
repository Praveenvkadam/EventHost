package in.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import in.backend.dto.PasswordResetRequest;
import in.backend.dto.ResetPasswordDTO;
import in.backend.exception.InvalidTokenException;
import in.backend.exception.PasswordMismatchException;
import in.backend.service.UserService;

import jakarta.validation.Valid;// Use javax for Java 8, not jakarta

/**
 * Controller for handling password reset requests.
 * Split from AuthController for cleaner responsibility.
 * 
 * Compatible with Java 8.
 */
@RestController
@RequestMapping("/api/password")
public class PasswordController {

    private final UserService userService;

    /**
     * Constructor injection of UserService.
     */
    public PasswordController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Step 1: Request a password reset link.
     * Always returns success message (to avoid revealing whether an email exists).
     *
     * @param request - PasswordResetRequest DTO containing email
     * @return ResponseEntity with generic message
     */
    @PostMapping("/forgot")
    public ResponseEntity<Map<String, String>> forgotPassword(@Valid @RequestBody PasswordResetRequest request) {
        userService.createPasswordResetToken(request);

        Map<String, String> response = new HashMap<>();
        response.put("message", "If the email exists, a password reset link has been sent.");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /**
     * Step 2: Reset password using provided token.
     *
     * @param dto - ResetPasswordDTO containing token and new password
     * @return ResponseEntity with success or error message
     */
    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@Valid @RequestBody ResetPasswordDTO dto) {
        Map<String, String> response = new HashMap<>();

        try {
            userService.resetPassword(dto);
            response.put("message", "Password reset successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (InvalidTokenException | PasswordMismatchException e) {
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
    }
}
