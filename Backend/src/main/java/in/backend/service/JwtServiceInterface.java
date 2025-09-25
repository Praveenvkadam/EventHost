package in.backend.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface JwtServiceInterface {

    // Generate JWT token for a given username
    String generateToken(String username);

    // Extract the username (subject) from JWT token
    String extractSubject(String token);

    // Validate JWT token against user details
    boolean validateToken(String token, UserDetails userDetails);

    // Check if JWT token is expired
    boolean isTokenExpired(String token);
}
