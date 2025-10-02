package in.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDTO {

    private Long id;
    private String name;
    private String email;
    private String phone;
    
    // Provide default if not set
    private String assignedEvent = "Not Assigned";  
    
    private String status = "Pending";        // Accepted / Declined / Pending
    
    private Boolean completed = false;   // true / false
}
