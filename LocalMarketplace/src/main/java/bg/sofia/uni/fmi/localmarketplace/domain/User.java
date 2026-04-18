package bg.sofia.uni.fmi.localmarketplace.domain;

import java.util.Objects;
import java.util.concurrent.atomic.AtomicLong;

public class User {

    private static final AtomicLong idCounter = new AtomicLong(1);

    private String name;
    private String password;
    private String email;
    private final long id;

    // Without lists of purchases and posted offers. They may contain ids of "owners"

    public User(String name, String password, String email) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.id = idCounter.getAndIncrement();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getId() {
        return id;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof User user)) return false;
        return id == user.id;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
