package in.backend.service;

import in.backend.dto.EmployeeDTO;
import in.backend.entity.Employee;
import in.backend.repository.EmployeeRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepo employeeRepository;

    @Override
    public EmployeeDTO addEmployee(EmployeeDTO employeeDTO) {
        Employee employee = EmployeeMapper.toEntity(employeeDTO);
        Employee saved = employeeRepository.save(employee);
        return EmployeeMapper.toDTO(saved);
    }

    @Override
    public List<EmployeeDTO> getAllEmployees() {
        return employeeRepository.findAll()
                .stream()
                .map(EmployeeMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDTO getEmployeeById(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
        return EmployeeMapper.toDTO(employee);
    }

    @Override
    public EmployeeDTO updateEmployee(Long id, EmployeeDTO dto) {
        Employee existing = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));

        existing.setName(dto.getName() != null ? dto.getName() : existing.getName());
        existing.setEmail(dto.getEmail() != null ? dto.getEmail() : existing.getEmail());
        existing.setPhone(dto.getPhone() != null ? dto.getPhone() : existing.getPhone());
        existing.setAssignedEvent(dto.getAssignedEvent() != null ? dto.getAssignedEvent() : existing.getAssignedEvent());
        existing.setStatus(dto.getStatus() != null ? dto.getStatus() : existing.getStatus());
        existing.setCompleted(dto.getCompleted() != null ? dto.getCompleted() : existing.isCompleted());

        Employee updated = employeeRepository.save(existing);
        return EmployeeMapper.toDTO(updated);
    }

    @Override
    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException("Employee not found with id: " + id);
        }
        employeeRepository.deleteById(id);
    }

    @Override
    public EmployeeDTO updateStatus(Long id, String status) {
        Employee existing = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
        existing.setStatus(status);
        Employee updated = employeeRepository.save(existing);
        return EmployeeMapper.toDTO(updated);
    }
}
