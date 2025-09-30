package in.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.backend.entity.Service;

@Repository
public interface ServiceRepository extends JpaRepository<Service, Long> {
    // You can add custom queries here if needed, e.g. findByName, findByPriceLessThan, etc.
}

