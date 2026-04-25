package bg.sofia.uni.fmi.localmarketplace.repository.inmemory;

import bg.sofia.uni.fmi.localmarketplace.domain.Product;
import bg.sofia.uni.fmi.localmarketplace.repository.ProductRepository;
import bg.sofia.uni.fmi.localmarketplace.vo.ProductType;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

public class InMemoryProductRepository implements ProductRepository {

    private final Map<Long, Product> products = new HashMap<>();
    private final AtomicLong idSequence = new AtomicLong();

    @Override
    public Product save(Product product) {
        products.put(product.getId(), product);
        return product;
    }

    @Override
    public Optional<Product> findById(Long id) {
        return Optional.ofNullable(products.get(id));
    }

    @Override
    public List<Product> findAll() {
        return List.copyOf(products.values());
    }

    @Override
    public void deleteById(Long id) {
        products.remove(id);
    }

    @Override
    public boolean existsById(Long id) {
        return products.containsKey(id);
    }

    @Override
    public List<Product> findByType(ProductType type) {
        List<Product> result = new ArrayList<>();
        for (Product product : products.values()) {
            if (product.getProductType().equals(type)) {
                result.add(product);
            }
        }
        return result;
    }

    @Override
    public List<Product> findByLocation(String location) {
        List<Product> result = new ArrayList<>();
        for (Product product : products.values()) {
            if (product.getLocation().equals(location)) {
                result.add(product);
            }
        }
        return result;
    }

    @Override
    public List<Product> findByPriceBetween(double min, double max) {
        List<Product> result = new ArrayList<>();
        for (Product product : products.values()) {
            if (product.getPrice() >= min && product.getPrice() <= max) {
                result.add(product);
            }
        }
        return result;
    }

    @Override
    public List<Product> findByVendorId(Long vendorId) {
        List<Product> result = new ArrayList<>();
        for (Product product : products.values()) {
            if (product.getMaker().getId() == vendorId) {
                result.add(product);
            }
        }
        return result;
    }

    @Override
    public List<Product> findBySearchText(String text) {
        List<Product> result = new ArrayList<>();
        for (Product product : products.values()) {
            if (product.getDescription().toLowerCase().contains(text.toLowerCase())) {
                result.add(product);
            }
        }
        return result;
    }
}
