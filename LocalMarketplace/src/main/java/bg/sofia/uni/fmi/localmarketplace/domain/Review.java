package bg.sofia.uni.fmi.localmarketplace.domain;

import java.util.Objects;
import java.util.concurrent.atomic.AtomicLong;

public class Review {

    private static final AtomicLong idCounter = new AtomicLong(1);

    private final Long id;
    private final User user;
    private final Product product;
    private String text;
    private double rating;

    public Review(User user, Product product, String text, double rating) {
        this.id = idCounter.getAndIncrement();
        this.text = text;
        this.rating = rating;
    }

    public long getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public long getReviewerId() {
        return reviewerId;
    }

    public long getProductId() {
        return productId;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Review review)) return false;
        return Objects.equals(id, review.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
