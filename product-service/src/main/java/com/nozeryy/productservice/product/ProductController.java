package com.nozeryy.productservice.product;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:4200")
public class ProductController {
    private final  ProductService productService;

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(@RequestBody ProductRequest productRequest){
        return new ResponseEntity<>(productService.createProduct(productRequest), HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<List<ProductResponse>> getAllProducts(){
        return ResponseEntity.ok(productService.findAllProducts());
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductResponse>> getAllProductsByCategory(@RequestParam String category){
        return ResponseEntity.ok(productService.findAllByCategory(category));
    }

    @GetMapping("/recommendations/{product-id}")
    public ResponseEntity<List<ProductResponse>> getProductRecommendations(@PathVariable(name = "product-id") Long productId){
        return ResponseEntity.ok(productService.findTop4ByCategoryAndIdNot(productId));
    }


    @GetMapping("/{product-id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable(name = "product-id") Long id){
        return ResponseEntity.ok(productService.findProductById(id));
    }

    @DeleteMapping("/{product-id}")
    public void deleteProductById(@PathVariable(name = "product-id") Long id){
        productService.deleteProductById(id);
    }

}
