package in.backend.controller;

import in.backend.dto.EmployeeDTO;
import in.backend.service.EmployeeService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor

public class EmployeeController {

    private final EmployeeService employeeService;

    // --------------------------
    // Add new Employee
    // --------------------------
    @PostMapping
    public ResponseEntity<EmployeeDTO> addEmployee(@RequestBody EmployeeDTO dto) {
        EmployeeDTO saved = employeeService.addEmployee(dto);
        return ResponseEntity.ok(saved);
    }

    // --------------------------
    // Get all Employees
    // --------------------------
    @GetMapping
    public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
        List<EmployeeDTO> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    // --------------------------
    // Update Employee (all fields)
    // --------------------------
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeDTO> updateEmployee(@PathVariable Long id,
                                                      @RequestBody EmployeeDTO dto) {
        EmployeeDTO updated = employeeService.updateEmployee(id, dto);
        return ResponseEntity.ok(updated);
    }

    // --------------------------
    // Update status (Accept/Decline from email)
    // Example: /api/employees/5/status?status=Accepted
    // --------------------------
    @PatchMapping("/{id}/status")
    public ResponseEntity<EmployeeDTO> updateStatus(@PathVariable Long id,
                                                    @RequestParam String status) {
        EmployeeDTO updated = employeeService.updateStatus(id, status);
        return ResponseEntity.ok(updated);
    }
}
