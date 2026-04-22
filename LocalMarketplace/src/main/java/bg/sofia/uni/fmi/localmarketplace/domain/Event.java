package bg.sofia.uni.fmi.localmarketplace.domain;

import bg.sofia.uni.fmi.localmarketplace.vo.EventType;

import java.awt.image.BufferedImage;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

public class Event {

    private final AtomicLong idCounter =  new AtomicLong(1);

    private final long id;
    private String title;
    private String description;
    private LocalDateTime startDate;
    private EventType eventType;
    // private Optional<BufferedImage> image;

    private final long artisanId;

    public Event(String title, String description, LocalDateTime startDate, EventType eventType) {
        this.id = idCounter.incrementAndGet();
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.eventType = eventType;
        // ARTISAN_ID
    }

}
