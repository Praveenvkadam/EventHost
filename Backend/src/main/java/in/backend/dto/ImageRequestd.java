package in.backend.dto;

import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class ImageRequestd {
    private String title;
    private String description;
    private LocalDate date; //  LocalDate (Spring auto-parses YYYY-MM-DD)
    private List<String> urls; // exactly 4 URLs
}
