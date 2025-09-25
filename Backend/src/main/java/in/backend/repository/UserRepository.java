package in.backend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import in.backend.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByPhone(String phone);

    // This is needed for reset password flow
    Optional<User> findByResetToken(String resetToken);
}
