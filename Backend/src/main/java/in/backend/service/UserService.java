package in.backend.service;

import in.backend.dto.AuthRequest;
import in.backend.dto.AuthResponse;
import in.backend.dto.PasswordResetRequest;
import in.backend.dto.ResetPasswordDTO;

public interface UserService {

    AuthResponse register(String username, String email, String phone, String password);

    AuthResponse login(AuthRequest request);

    void createPasswordResetToken(PasswordResetRequest request);

    boolean resetPassword(ResetPasswordDTO resetPasswordDTO);

    /**
     * Get the currently logged-in user details from JWT token.
     */
    AuthResponse getLoggedInUser(String token);
}
