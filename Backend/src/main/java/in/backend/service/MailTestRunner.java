package in.backend.service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MailTestRunner {

    private final MailService mailService;

    public MailTestRunner(MailService mailService) {
        this.mailService = mailService;
    }

    @GetMapping("/test-reset-email")
    public String testEmail() {
        mailService.sendPasswordReset("test@example.com", "123456token");
        return "Password reset email sent!";
    }
}
