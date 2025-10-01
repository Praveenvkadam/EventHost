package in.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import in.backend.entity.OrderEntity;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> { }
