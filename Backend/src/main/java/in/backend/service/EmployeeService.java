package in.backend.service;

import in.backend.dto.EmployeeDTO;
import java.util.List;

public interface EmployeeService {
    EmployeeDTO addEmployee(EmployeeDTO employeeDTO);
    List<EmployeeDTO> getAllEmployees();
    EmployeeDTO getEmployeeById(Long id);
    EmployeeDTO updateEmployee(Long id, EmployeeDTO employeeDTO);
    void deleteEmployee(Long id);
    EmployeeDTO updateStatus(Long id, String status); 
}
