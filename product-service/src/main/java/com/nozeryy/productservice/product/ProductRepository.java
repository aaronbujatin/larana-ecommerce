package com.nozeryy.productservice.product;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory(String category);
    List<Product> findTop4ByCategoryAndIdNot(String category, Long id);


}
