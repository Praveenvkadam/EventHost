package in.backend.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender mailSender;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendPasswordReset(String toEmail, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setFrom("aq199075@gmail.com"); // must match spring.mail.username
        message.setSubject("Password Reset Request");
        message.setText("Hello,\n\n"
                + "To reset your password, click the link below:\n"
                + "http://localhost:5173/reset-password?token=" + token + "\n\n"
                + "This link expires in 15 minutes.\n"
                + "If you did not request this, ignore this email.");
        mailSender.send(message);
    }
}
