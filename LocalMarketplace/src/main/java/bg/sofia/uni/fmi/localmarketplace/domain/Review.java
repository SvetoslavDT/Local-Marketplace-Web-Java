package bg.sofia.uni.fmi.localmarketplace.domain;

import java.util.Objects;
import java.util.concurrent.atomic.AtomicLong;

public class Review {

    private static final AtomicLong idCounter = new AtomicLong(1);

    private final long id;
    private String text;
    private final long reviewerId;
    private final long productId;

    public Review(String text, long reviewerId, long productId) {
        this.id = idCounter.getAndIncrement();
        this.text = text;
        this.reviewerId = reviewerId;
        this.productId = productId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
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
        return id == review.id;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
