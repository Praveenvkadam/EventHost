package in.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String message;
    private Long id;
    private String username;
    private String email;
    private String phone;
    private String token; // 🔑 add JWT or session token
}