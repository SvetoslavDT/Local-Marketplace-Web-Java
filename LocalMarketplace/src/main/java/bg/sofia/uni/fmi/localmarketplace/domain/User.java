package bg.sofia.uni.fmi.localmarketplace.domain;

import bg.sofia.uni.fmi.localmarketplace.vo.UserType;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicLong;

public class User {

    //Undone
    private Long id;
    private String name;
    private String password;
    private String email;
    private UserType userType;
    private boolean active;

    private List<Product> products;

    public User(String name, String password, String email, UserType userType) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.active = false;
        this.userType = userType;

        // For Vendors/Admins
        this.products = new ArrayList<>();
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

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public long getId() {
        return id;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof User user)) return false;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
