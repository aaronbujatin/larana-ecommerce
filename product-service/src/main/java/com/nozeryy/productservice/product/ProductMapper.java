package com.nozeryy.productservice.product;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductMapper {

    public Product toProduct(ProductRequest productRequest){
        Product product = Product.builder()
                .name(productRequest.name())
                .description(productRequest.description())
                .price(productRequest.price())
                .imageUrl(productRequest.imageUrl())
                .build();

            List<ProductSize> productSizes = productRequest.productSizeRequests()
                    .stream()
                    .map(productSizeReq -> {
                        ProductSize productSize = new ProductSize();
                        productSize.setStock(productSizeReq.stock());
                        productSize.setSize(productSizeReq.size());
                        productSize.setProduct(product);
                        return productSize;
                    })
                    .toList();
            product.setProductSizes(productSizes);
        return product;
    }

    public ProductResponse toProductResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getProductSizes()
                        .stream()
                        .map(productSizeRes -> new ProductSizeResponse(
                                productSizeRes.getId(),
                                productSizeRes.getStock(),
                                productSizeRes.getSize(),
                                product.getId())
                        )
                        .toList(),
                product.getImageUrl()
        );
    }
}
