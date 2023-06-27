package ro.safedriving.service;

import org.springframework.data.repository.CrudRepository;
import ro.safedriving.model.TestCar;
import ro.safedriving.model.UserApp;

import java.util.Optional;

public interface UserAppRepo extends CrudRepository<UserApp, String> {

    Optional<UserApp> findByUserName(String userName);
}
