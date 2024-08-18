package com.nozeryy.productservice.product;

import java.math.BigDecimal;
import java.util.List;

public record ProductResponse(
        Long id,
        String name,
        String description,
        BigDecimal price,
        List<ProductSizeResponse> productSizeResponses,
        String imageUrl
) {
}
