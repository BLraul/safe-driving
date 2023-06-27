package ro.safedriving.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ro.safedriving.model.RoleUser;
import ro.safedriving.model.UserApp;
import ro.safedriving.service.RoleAppRepo;
import ro.safedriving.service.UserAppRepo;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserAppService {
    @Autowired
    private UserAppRepo userAppRepo;

    @Autowired
    private RoleAppRepo roleAppRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void initRoleAndUser() {

        RoleUser adminRole = new RoleUser();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("Admin role");
        roleAppRepo.save(adminRole);

        RoleUser userRole = new RoleUser();
        userRole.setRoleName("User");
        userRole.setRoleDescription("User roles provide partial access for this application");
        roleAppRepo.save(userRole);

        UserApp adminUser = new UserApp();
        adminUser.setUserName("admin123");
        adminUser.setUserPassword(getEncodedPassword("raul@pass"));
        adminUser.setUserFirstName("Balacescu");
        adminUser.setUserLastName("Raul");
        Set<RoleUser> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        adminUser.setRole(adminRoles);
        userAppRepo.save(adminUser);

//        UserApp user = new UserApp();
//        user.setUserName("raul123");
//        user.setUserPassword(getEncodedPassword("raul@123"));
//        user.setUserFirstName("Raul");
//        user.setUserLastName("Lucian");
//        Set<RoleApp> userRoles = new HashSet<>();
//        userRoles.add(userRole);
//        user.setRole(userRoles);
//        userAppRepo.save(user);
    }

    public UserApp registerNewUser(UserApp user) {
        RoleUser role = roleAppRepo.findById("User").get();
        Set<RoleUser> userRoles = new HashSet<>();
        userRoles.add(role);
        user.setRole(userRoles);
        user.setUserPassword(getEncodedPassword(user.getUserPassword()));

        return userAppRepo.save(user);
    }

    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }
}
