package in.backend.service;

import in.backend.dto.AuthRequest;
import in.backend.dto.AuthResponse;
import in.backend.dto.PasswordResetRequest;
import in.backend.dto.ResetPasswordDTO;
import in.backend.entity.User;
import in.backend.exception.EmailAlreadyExistsException;
import in.backend.exception.InvalidTokenException;
import in.backend.exception.PasswordMismatchException;
import in.backend.repository.UserRepository;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final MailService mailService;
    private final JwtService jwtService; // ✅ add JwtService

    public UserServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder,
                           AuthenticationManager authenticationManager,
                           MailService mailService,
                           JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.mailService = mailService;
        this.jwtService = jwtService; // ✅ inject JwtService
    }

    @Override
    public AuthResponse register(String username, String email, String phone, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new EmailAlreadyExistsException("Email already registered: " + email);
        }
        if (userRepository.findByPhone(phone).isPresent()) {
            throw new EmailAlreadyExistsException("Phone already registered: " + phone);
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPhone(phone);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);

        return new AuthResponse(
                "Registration successful",
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPhone(),
                null // no token on registration
        );
    }

    @Override
    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 🔑 Generate JWT
        String token = jwtService.generateToken(user.getEmail());

        return new AuthResponse(
                "Login successful",
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPhone(),
                token
        );
    }

    @Override
    public void createPasswordResetToken(PasswordResetRequest request) {
        userRepository.findByEmail(request.getEmail()).ifPresent(user -> {
            String token = UUID.randomUUID().toString();
            user.setResetToken(token);
            user.setResetTokenExpiry(LocalDateTime.now().plusMinutes(15));
            userRepository.save(user);

            mailService.sendPasswordReset(user.getEmail(), token);
        });
    }

    @Override
    public boolean resetPassword(ResetPasswordDTO dto) {
        if (!dto.getNewPassword().equals(dto.getConfirmPassword())) {
            throw new PasswordMismatchException("Passwords do not match");
        }

        User user = userRepository.findByResetToken(dto.getToken())
                .orElseThrow(() -> new InvalidTokenException("Invalid or expired password reset token"));

        if (user.getResetTokenExpiry() == null ||
                user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new InvalidTokenException("Reset token has expired");
        }

        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        userRepository.save(user);

        return true;
    }

    @Override
    public AuthResponse getLoggedInUser(String token) {
        // 🔑 extract email from JWT
        String email = jwtService.extractSubject(token);  // <-- use extractEmail instead of extractUsername

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new AuthResponse(
                "User fetched successfully",
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPhone(),
                token
        );
    }
}
