package in.backend.dto;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServicesResponse {
	 private Long id;
	    private String title;
	    private String description;
	    private Double price;
	    // Keep individual fields if needed
	    private String image1;
	    private String image2;
	    private String image3;
	    private String image4;

	    // Add urls list for frontend convenience
	    private List<String> urls;

	    // Convenience method to populate urls from image1..image4
	    public void setUrlsFromImages() {
	        this.urls = Arrays.asList(image1, image2, image3, image4);
	    }
}
