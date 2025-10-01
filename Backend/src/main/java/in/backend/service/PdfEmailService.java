package in.backend.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfWriter;
import in.backend.entity.Booking;
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

    public void sendBookingReceipt(Booking booking, String paymentId) throws Exception {
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
        helper.setSubject("Booking Confirmation & Payment Receipt");
        helper.setText("Dear " + booking.getFullName() + ",\n\nPlease find your booking and payment receipt attached.");

        helper.addAttachment("BookingReceipt.pdf", new ByteArrayResource(outputStream.toByteArray()));

        mailSender.send(message);
    }
}
