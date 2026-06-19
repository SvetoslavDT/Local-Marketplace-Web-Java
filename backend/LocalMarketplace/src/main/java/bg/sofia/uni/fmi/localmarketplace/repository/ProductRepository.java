package bg.sofia.uni.fmi.localmarketplace.repository;

import bg.sofia.uni.fmi.localmarketplace.domain.Product;
import bg.sofia.uni.fmi.localmarketplace.vo.ProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByProductTypeAndMaker_Username(ProductType productType, String makerUsername, Pageable pageable);

    Page<Product> findByProductType(ProductType productType, Pageable pageable);

    Page<Product> findByMakerUsername(String makerUsername, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE " +
        "(:productType IS NULL OR p.productType = :productType) AND " +
        "(:makerUsername IS NULL OR p.maker.username = :makerUsername) AND " +
        "(:inStock IS NULL OR (:inStock = true AND p.quantity > 0) OR (:inStock = false AND p.quantity = 0))")
    Page<Product> findProductsWithFilters(
        @Param("productType") ProductType productType,
        @Param("makerUsername") String makerUsername,
        @Param("inStock") Boolean inStock,
        Pageable pageable
    );
}
