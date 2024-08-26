package com.nozeryy.productservice.product;

import java.math.BigDecimal;
import java.util.List;

public record ProductResponse(
        Long id,
        String name,
        String description,
        String brand,
        String category,
        BigDecimal price,
        List<String> details,
        List<ProductSizeResponse> productSizes,
        List<String> imageUrl
) {
}
