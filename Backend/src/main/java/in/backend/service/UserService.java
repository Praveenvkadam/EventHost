package in.backend.service;

import in.backend.dto.AuthRequest;
import in.backend.dto.AuthResponse;
import in.backend.dto.PasswordResetRequest;
import in.backend.dto.ResetPasswordDTO;
import in.backend.entity.User;

import java.util.List;

public interface UserService {

    AuthResponse register(String username, String email, String phone, String password);

    AuthResponse login(AuthRequest request);

    void createPasswordResetToken(PasswordResetRequest request);

    boolean resetPassword(ResetPasswordDTO resetPasswordDTO);

    AuthResponse getLoggedInUser(String token);

    List<User> getAllUsers();

    List<User> searchUsers(String query);

    void deleteUser(Long id);

    User getUserById(Long id);
}
