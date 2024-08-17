package com.nozeryy.productservice.product;

import java.math.BigDecimal;
import java.util.List;

public record ProductRequest(
        Long id,
        String name,
        String description,
        BigDecimal price,
        List<ProductSize> productSize,
        String imageUrl
) {
}
