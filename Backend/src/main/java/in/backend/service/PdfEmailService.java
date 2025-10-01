package in.backend.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import in.backend.entity.Booking;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class PdfEmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendBookingReceipt(Booking booking, String paymentId) {
        try {
            // Generate PDF
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            Document document = new Document();
            PdfWriter.getInstance(document, outputStream);
            document.open();

            Font titleFont = new Font(Font.HELVETICA, 18, Font.BOLD);
            Font textFont = new Font(Font.HELVETICA, 12);

            document.add(new Paragraph("Booking & Payment Receipt", titleFont));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Booking Details:", titleFont));
            document.add(new Paragraph("Service: " + booking.getBookedService().getName(), textFont));
            document.add(new Paragraph("Date: " + booking.getEventDate(), textFont));
            document.add(new Paragraph("Time: " + booking.getEventTime(), textFont));
            document.add(new Paragraph("Guests: " + booking.getGuests(), textFont));
            document.add(new Paragraph("Venue: " + booking.getVenue(), textFont));
            document.add(new Paragraph(" "));

            document.add(new Paragraph("Payment Details:", titleFont));
            document.add(new Paragraph("Amount Paid: ₹" + booking.getBookedService().getPrice(), textFont));
            document.add(new Paragraph("Payment ID: " + paymentId, textFont));
            document.add(new Paragraph("Status: " + booking.getStatus(), textFont));

            document.close();

            // Send Email
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(booking.getEmail());
            helper.setFrom("aq199075@gmail.com"); // MUST match spring.mail.username
            helper.setSubject("Booking Confirmation & Payment Receipt");

            String htmlText = "<p>Dear " + booking.getFullName() + ",</p>"
                    + "<p>Thank you for your payment. Please find your booking and payment receipt attached.</p>";

            helper.setText(htmlText, true); // HTML content
            helper.addAttachment("BookingReceipt.pdf", new ByteArrayResource(outputStream.toByteArray()));

            mailSender.send(message);

        } catch (MessagingException | DocumentException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to send payment receipt email", e);
        }
    }
}
