package in.backend.service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailService implements MailServiceInterface {

    private final JavaMailSender mailSender;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendPasswordReset(String toEmail, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setFrom("aq199075@gmail.com");
        message.setSubject("Password Reset Request");
        message.setText("Hello,\n\n"
                + "To reset your password, click the link below:\n"
                + "http://localhost:5173/reset-password?token=" + token + "\n\n"
                + "This link expires in 15 minutes.\n"
                + "If you did not request this, ignore this email.");
        mailSender.send(message);
    }

    @Override
    public void sendEventInvite(String toEmail, String empName, String eventName, String acceptUrl, String declineUrl) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setFrom("aq199075@gmail.com");
            helper.setSubject("Invitation for " + eventName);

            String html = "<h2>Hello " + empName + ",</h2>"
                    + "<p>You are invited to the event: <b>" + eventName + "</b></p>"
                    + "<p>Please respond below:</p>"
                    + "<a href='" + acceptUrl + "' style='padding:10px 20px;background:green;color:white;"
                    + "text-decoration:none;border-radius:5px;margin-right:10px;'>Accept ✅</a>"
                    + "<a href='" + declineUrl + "' style='padding:10px 20px;background:red;color:white;"
                    + "text-decoration:none;border-radius:5px;'>Decline ❌</a>";

            helper.setText(html, true);

            mailSender.send(mimeMessage);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
