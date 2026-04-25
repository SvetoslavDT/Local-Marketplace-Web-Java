package bg.sofia.uni.fmi.localmarketplace.repository;

import bg.sofia.uni.fmi.localmarketplace.domain.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository {

    User save(User user);
    Optional<User> findById(Long id);
    List<User> findAll();
    void deleteById(Long id);
    boolean existsById(Long id);

    Optional<User> findByEmail(String email);
}
