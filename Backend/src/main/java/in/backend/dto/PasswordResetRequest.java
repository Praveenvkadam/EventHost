package in.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class PasswordResetRequest {

    @NotBlank(message = "Email is required")
    @Email(message = "Email is invalid")
    private String email;

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
