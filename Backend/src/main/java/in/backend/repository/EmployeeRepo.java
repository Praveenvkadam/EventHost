package in.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import in.backend.entity.Employee;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Long> {
    // Optional: you can add custom queries here if needed, e.g.,
    // List<Employee> findByStatus(String status);
}

