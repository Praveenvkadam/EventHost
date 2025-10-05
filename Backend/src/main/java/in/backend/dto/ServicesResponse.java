package in.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServicesResponse {

    private Long id;
    private String title;
    private String description;
    private Double price;

    private String image1;
    private String image2;
    private String image3;
    private String image4;

    private LocalDateTime createdAt;

    // Convenience list for frontend
    private List<String> urls;

    public void setUrlsFromImages() {
        this.urls = Arrays.asList(image1, image2, image3, image4);
    }
}
