package com.nozeryy.productservice.product;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
public class Product {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private String brand;
    private String category;
    private BigDecimal price;
    private List<String> details;
    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductSize> productSizes = new ArrayList<>();
    private List<String> imageUrl;

}
