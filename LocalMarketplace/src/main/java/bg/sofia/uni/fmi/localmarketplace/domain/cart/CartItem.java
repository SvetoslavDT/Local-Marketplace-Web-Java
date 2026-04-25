package bg.sofia.uni.fmi.localmarketplace.domain.cart;

import bg.sofia.uni.fmi.localmarketplace.domain.Product;

import java.util.Objects;

public class CartItem {

    private Long id;
    private Cart cart;
    private Product product;
    private int quantity;

    public CartItem(Long id, Cart cart, Product product, int quantity) {
        if (id == null) {
            throw new IllegalArgumentException("id cannot be null");
        } else if (product == null) {
            throw new IllegalArgumentException("product cannot be null");
        } else if (quantity < 0) {
            throw new IllegalArgumentException("quantity cannot be negative");
        }
        this.id = id;
        this.cart = cart;
        this.product = product;
        this.quantity = quantity;
    }

    public Long getId() {
        return id;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof CartItem cartItem)) return false;
        return Objects.equals(id, cartItem.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
