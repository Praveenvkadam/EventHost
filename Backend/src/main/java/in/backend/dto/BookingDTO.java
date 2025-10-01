package in.backend.dto;

import in.backend.entity.Booking;
import in.backend.entity.Service;
import in.backend.enums.PaymentStatus;
import lombok.Data;

@Data
public class BookingDTO {
    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String eventDate;
    private String eventTime;
    private Integer guests;
    private String venue;
    private String address;
    private String notes;
    private String status; // keep as String for API response

    // Service details
    private Long serviceId;
    private String serviceTitle;
    private String serviceDescription;
    private Double servicePrice;
    private String serviceImg; // first available image only

    public BookingDTO(Booking booking) {
        if (booking == null) return;

        this.id = booking.getId();
        this.fullName = booking.getFullName();
        this.email = booking.getEmail();
        this.phone = booking.getPhone();
        this.eventDate = booking.getEventDate();
        this.eventTime = booking.getEventTime();
        this.guests = booking.getGuests();
        this.venue = booking.getVenue();
        this.address = booking.getAddress();
        this.notes = booking.getNotes();

        // Convert enum to string safely
        PaymentStatus bookingStatus = booking.getStatus();
        this.status = bookingStatus != null ? bookingStatus.name() : "PENDING";

        // Map service details
        Service s = booking.getBookedService();
        if (s != null) {
            this.serviceId = s.getId();
            this.serviceTitle = s.getServiceTitle(); 
            this.serviceDescription = s.getDescription();
            this.servicePrice = s.getPrice();

            // pick first available image
            this.serviceImg = s.getImage1() != null ? s.getImage1()
                          : s.getImage2() != null ? s.getImage2()
                          : s.getImage3() != null ? s.getImage3()
                          : s.getImage4();
        }
    }
}
