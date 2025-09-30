package in.backend.dto;

import in.backend.entity.Booking;
import in.backend.entity.Service;
import lombok.Data;

@Data
public class BookingDTO {
    private Long id;
    private String eventDate;
    private String eventTime;
    private int guests;
    private String venue;
    private String address;
    private String notes;
    private String status;

    private Long serviceId;
    private String serviceName;
    private Double servicePrice;
    private String serviceImg; // ✅ first image only

    public BookingDTO(Booking booking) {
        this.id = booking.getId();
        this.eventDate = booking.getEventDate();
        this.eventTime = booking.getEventTime();
        this.guests = booking.getGuests();
        this.venue = booking.getVenue();
        this.address = booking.getAddress();
        this.notes = booking.getNotes();
        this.status = booking.getStatus();

        if (booking.getBookedService() != null) {
            Service s = booking.getBookedService();
            this.serviceId = s.getId();
            this.serviceName = s.getName();
            this.servicePrice = s.getPrice();
            // ✅ Pick first available image
            this.serviceImg = s.getImage1() != null ? s.getImage1() :
                              s.getImage2() != null ? s.getImage2() :
                              s.getImage3() != null ? s.getImage3() :
                              s.getImage4();
        }
    }
}
