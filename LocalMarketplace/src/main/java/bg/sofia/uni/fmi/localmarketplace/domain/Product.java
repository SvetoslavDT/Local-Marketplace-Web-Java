package bg.sofia.uni.fmi.localmarketplace.domain;

import bg.sofia.uni.fmi.localmarketplace.vo.ProductType;

import java.util.Objects;
import java.util.concurrent.atomic.AtomicLong;

public class Product {

    private final AtomicLong idCounter =  new AtomicLong(1);

    private final long id;
    private ProductType productType;
    private String description;
    private double price;
    private int count;
    private String location;

    private Double rating;

    public Product(ProductType productType, String description, double price, int count, String location) {
        this.id = idCounter.getAndIncrement();
        this.productType = productType;
        this.description = description;
        this.price = price;
        this.count = count;
        this.location = location;
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

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public void decrementCount() {
        this.count--;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(float rating) {
        if (this.rating == null) {
            this.rating = (double) rating;
        } else {
            this.rating = (this.rating + (double) rating) / 2;
        }
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Product product)) return false;
        return id == product.id;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
