package bg.sofia.uni.fmi.localmarketplace.domain;

import java.util.Objects;

public class Inventory {

    private final Long id;
    private Product product;
    private int stockQuantity;
    private int reservedQuantity;

    public Inventory(Long id, Product product, int stockQuantity, int reservedQuantity) {
        if ( id == null) {
            throw new IllegalArgumentException("id cannot be null");
        } else if ( product == null ) {
            throw new IllegalArgumentException("product cannot be null");
        } else if ( stockQuantity < 0 ) {
            throw new IllegalArgumentException("stockQuantity cannot be negative");
        } else if (reservedQuantity < 0 ) {
            throw new IllegalArgumentException("reservedQuantity cannot be negative");
        }
        this.id = id;
        this.product = product;
        this.stockQuantity = stockQuantity;
        this.reservedQuantity = reservedQuantity;
    }

    public Long getId() {
        return id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getStockQuantity() {
        return stockQuantity;
    }

    public void setStockQuantity(int stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public int getReservedQuantity() {
        return reservedQuantity;
    }

    public void setReservedQuantity(int reservedQuantity) {
        this.reservedQuantity = reservedQuantity;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Inventory inventory)) return false;
        return Objects.equals(id, inventory.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
