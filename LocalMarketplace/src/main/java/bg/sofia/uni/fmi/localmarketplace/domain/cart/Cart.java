package bg.sofia.uni.fmi.localmarketplace.domain.cart;

import bg.sofia.uni.fmi.localmarketplace.domain.User;

import java.util.List;
import java.util.Objects;

public class Cart {

    private Long id;
    private User user;
    private List<CartItem> items;

    public Cart(Long id, User user, List<CartItem> items) {
        if ( id == null) {
            throw new IllegalArgumentException("id cannot be null");
        } else if ( user == null ) {
            throw new IllegalArgumentException("user cannot be null");
        } else if ( items == null ) {
            throw new IllegalArgumentException("items cannot be null");
        }
        this.id = id;
        this.user = user;
        this.items = items;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Cart cart)) return false;
        return Objects.equals(id, cart.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
