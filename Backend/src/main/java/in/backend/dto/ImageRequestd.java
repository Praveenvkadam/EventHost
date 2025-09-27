package in.backend.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class ImageRequestd {
    private String title;
    private String description;
    private LocalDate date; // ✅ LocalDate
    private List<String> urls; // exactly 4 URLs
}
