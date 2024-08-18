package com.nozeryy.productservice.product;

public record ProductSizeResponse(
        Long id,
        Integer stock,
        String size,
        Long productId
) {
}
