package bg.sofia.uni.fmi.localmarketplace.domain;

import bg.sofia.uni.fmi.localmarketplace.vo.ProductType;

import java.util.Objects;

public class Product {

    private final Long id;
    private ProductType productType;
    private String description;
    private double price;
    private String location;

    private final User maker;

    public Product(ProductType productType, String description, double price, String location, User maker) {
        this.productType = productType;
        this.description = description;
        this.price = price;
        this.location = location;
        this.maker = maker;
    }

    public long getId() {
        return id;
    }

    public ProductType getProductType() {
        return productType;
    }

    public void setProductType(ProductType productType) {
        this.productType = productType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public User getMaker() {
        return maker;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Product product)) return false;
        return Objects.equals(id, product.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
