package ro.safedriving.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ro.safedriving.model.RoleUser;
import ro.safedriving.serviceImpl.RoleUserService;

@RestController
//@RequestMapping("/roleApp")
public class RoleUserController {
    @Autowired
    private RoleUserService roleUserService;

    @PostMapping({"/createNewRole"})
    public RoleUser createNewRole(@RequestBody RoleUser role) {
        return roleUserService.createNewRole(role);
    }
}
