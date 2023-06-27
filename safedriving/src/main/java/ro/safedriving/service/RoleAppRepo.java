package ro.safedriving.service;

import org.springframework.data.repository.CrudRepository;
import ro.safedriving.model.RoleUser;

public interface RoleAppRepo extends CrudRepository<RoleUser, String> {
}
