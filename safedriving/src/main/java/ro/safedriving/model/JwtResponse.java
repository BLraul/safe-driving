package ro.safedriving.model;

public class JwtResponse {
    private UserApp user;
    private String jwtToken;

    public JwtResponse(UserApp user, String jwtToken) {
        this.user = user;
        this.jwtToken = jwtToken;
    }

    public UserApp getUser() {
        return user;
    }

    public void setUser(UserApp user) {
        this.user = user;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }
}
