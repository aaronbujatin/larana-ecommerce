package com.nozeryy.productservice.product;

public record ProductSizeRequest(
        Long id,
        Integer stock,
        String size
) {
}
