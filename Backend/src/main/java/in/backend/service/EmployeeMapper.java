package in.backend.service;

import in.backend.dto.EmployeeDTO;
import in.backend.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDTO toDTO(Employee emp) {
        return new EmployeeDTO(
                emp.getId(),
                emp.getName(),
                emp.getEmail(),
                emp.getPhone(),
                emp.getAssignedEvent(),
                emp.getStatus(),
                emp.isCompleted()
        );
    }

    public static Employee toEntity(EmployeeDTO dto) {
        Employee emp = new Employee();
        emp.setName(dto.getName());
        emp.setEmail(dto.getEmail());
        emp.setPhone(dto.getPhone());
        emp.setAssignedEvent(dto.getAssignedEvent() != null ? dto.getAssignedEvent() : "Not Assigned");
        emp.setStatus(dto.getStatus() != null ? dto.getStatus() : "Pending");
        emp.setCompleted(dto.getCompleted() != null ? dto.getCompleted() : false);
        return emp;
    }
}
