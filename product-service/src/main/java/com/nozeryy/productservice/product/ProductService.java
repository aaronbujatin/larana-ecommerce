package com.nozeryy.productservice.product;

import com.nozeryy.productservice.exception.ProductNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductResponse createProduct(ProductRequest productRequest) {
        var product = productRepository.save(productMapper.toProduct(productRequest));
        return productMapper.toProductResponse(product);
    }

    public List<ProductResponse> findAllByCategory(String category){
        return productRepository.findByCategory(category)
                .stream()
                .map(productMapper::toProductResponse)
                .toList();
    }

    public List<ProductResponse> findAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(productMapper::toProductResponse)
                .toList();
    }

    public List<ProductResponse> findTop4ByCategoryAndIdNot(Long id){
        var product = productRepository.findById(id).orElseThrow();
        return productRepository.findTop4ByCategoryAndIdNot(product.getCategory(), product.getId())
                .stream()
                .map(productMapper::toProductResponse)
                .toList();
    }

    public ProductResponse findProductById(Long id) {
        return productRepository.findById(id)
                .map(productMapper::toProductResponse)
                .orElseThrow(() -> new ProductNotFoundException("Product not found ID: " + id));
    }

    public void deleteProductById(Long id) {
        if(!productRepository.existsById(id)){
            throw new ProductNotFoundException("Product not found ID: " + id);
        }
        productRepository.deleteById(id);
    }
}
