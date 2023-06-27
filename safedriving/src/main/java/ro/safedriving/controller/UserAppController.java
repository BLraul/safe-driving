package ro.safedriving.controller;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ro.safedriving.model.UserApp;
import ro.safedriving.serviceImpl.UserAppService;

@RestController
public class UserAppController {
    @Autowired
    private UserAppService userService;

    @PostConstruct
    public void initRoleAndUser() {
        userService.initRoleAndUser();
    }
    @PostMapping({"/registerNewUser"})
    public UserApp registerNewUser(@RequestBody UserApp user) {
        return userService.registerNewUser(user);
    }
    @GetMapping({"/forAdmin"})
    @PreAuthorize("hasRole('Admin')")
    public String forAdmin(){
        return "This URL is only accessible to the admin";
    }

    @GetMapping({"/forUser"})
    @PreAuthorize("hasRole('User')")
    public String forUser(){
        return "This URL is only accessible to the user";
    }
}
