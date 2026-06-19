package bg.sofia.uni.fmi.localmarketplace.repository;

import bg.sofia.uni.fmi.localmarketplace.domain.Event;
import bg.sofia.uni.fmi.localmarketplace.vo.EventType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EventRepository extends JpaRepository<Event, Long> {

    Page<Event> findByType(EventType type, Pageable pageable);

    Page<Event> findByActive(boolean active, Pageable pageable);

    Page<Event> findByTypeAndActive(EventType type, boolean active, Pageable pageable);

    @Query("SELECT e FROM Event e WHERE " +
        "(:type IS NULL OR e.type = :type) AND " +
        "(:active IS NULL OR e.active = :active) AND " +
        "(:upcoming IS NULL OR (:upcoming = true AND e.startDate >= CURRENT_TIMESTAMP))")
    Page<Event> findEventsWithFilters(
        @Param("type") EventType type,
        @Param("active") Boolean active,
        @Param("upcoming") Boolean upcoming,
        Pageable pageable
    );
}
