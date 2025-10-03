package in.backend.repository;


import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;

import in.backend.entity.OrderEntity;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
	 long countByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
}
