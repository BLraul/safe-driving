package ro.safedriving.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ro.safedriving.model.JwtRequest;
import ro.safedriving.model.JwtResponse;
import ro.safedriving.model.UserApp;
import ro.safedriving.service.UserAppRepo;
import ro.safedriving.util.JwtUtil;

import java.util.HashSet;
import java.util.Set;

@Service
public class JwtService implements UserDetailsService {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserAppRepo userAppRepo;
    @Autowired
    private AuthenticationManager authenticationManager;
    public JwtResponse createJwtToken(JwtRequest jwtRequest) throws Exception {
        String userName = jwtRequest.getUserName();
        String userPassword = jwtRequest.getUserPassword();
        authenticate(userName, userPassword);

        UserDetails userDetails = loadUserByUsername(userName);
        String newGeneratedToken = jwtUtil.generateToken(userDetails);

        UserApp user = userAppRepo.findById(userName).get();
        return new JwtResponse(user, newGeneratedToken);
    }
    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        UserApp userApp = userAppRepo.findByUserName(userName).get() ;

        if (userApp != null) {
            return new org.springframework.security.core.userdetails.User(
                    userApp.getUserName(),
                    userApp.getUserPassword(),
                    getAuthority(userApp)
            );
        } else {
            throw new UsernameNotFoundException("User not found with username: " + userName);
        }
    }

    private Set getAuthority(UserApp userApp) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        userApp.getRole().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getRoleName()));
        });
        return authorities;
    }

    private void authenticate(String userName, String userPassword) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName, userPassword));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}
