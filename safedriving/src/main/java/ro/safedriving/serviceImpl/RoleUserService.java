package ro.safedriving.serviceImpl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.safedriving.model.RoleUser;
import ro.safedriving.service.RoleAppRepo;

@Service
public class RoleUserService {
    @Autowired
    private RoleAppRepo roleAppRepo;

    public RoleUser createNewRole(RoleUser role) {
        return roleAppRepo.save(role);
    }
}
