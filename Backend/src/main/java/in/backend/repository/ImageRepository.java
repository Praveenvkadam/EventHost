package in.backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.backend.entity.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
}