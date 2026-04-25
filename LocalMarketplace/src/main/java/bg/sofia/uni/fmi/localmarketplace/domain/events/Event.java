package bg.sofia.uni.fmi.localmarketplace.domain.events;

import bg.sofia.uni.fmi.localmarketplace.domain.User;
import bg.sofia.uni.fmi.localmarketplace.vo.DiscountType;
import bg.sofia.uni.fmi.localmarketplace.vo.EventType;

import java.time.LocalDateTime;
import java.util.Objects;

public class Event {

    private final Long id;

    private String title;
    private String description;
    private EventType type;

    //Stories
    private String content;

    //Promotions
    private DiscountType discountType;
    private double discountValue;

    //Craft Fairs
    private String location;

    //Stories/Promotions
    private final User user;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean isActive;
    //Image

    protected Event() {}

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public EventType getType() {
        return type;
    }

    public void setType(EventType type) {
        this.type = type;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public DiscountType getDiscountType() {
        return discountType;
    }

    public void setDiscountType(DiscountType discountType) {
        this.discountType = discountType;
    }

    public double getDiscountValue() {
        return discountValue;
    }

    public void setDiscountValue(double discountValue) {
        this.discountValue = discountValue;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public User getUser() {
        return user;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Event event)) return false;
        return Objects.equals(id, event.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
