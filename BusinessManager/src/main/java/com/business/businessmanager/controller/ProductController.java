package com.business.businessmanager.controller;

import com.business.businessmanager.exception.ResourceNotFoundException;
import com.business.businessmanager.model.Product;
import com.business.businessmanager.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v1/")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    //Get all products by REST
    @GetMapping("/products")
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    //Adding product by REST
    @PostMapping("/products")
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    //Get a Product By ID by REST
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductByID(@PathVariable Long id) {
        Product product = productRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Product id doesn't exist:" + id)
        );
        return ResponseEntity.ok(product);
    }

    //Update by REST
    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product newProduct) {
        Product product = productRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Product id doesn't exist:" + id)
        );
        product.setName(newProduct.getName());
        product.setPrice(newProduct.getPrice());
        product.setStock(newProduct.getStock());
        Product updatedProduct = productRepository.save(product);
        return ResponseEntity.ok(updatedProduct);
    }

    //Delete By REST
    @DeleteMapping("/products/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteProduct(@PathVariable  Long id){
        Map<String,Boolean> response= new HashMap<>();
        Product product = productRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Product id doesn't exist:" + id)
        );
        productRepository.delete(product);
        response.put("deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
