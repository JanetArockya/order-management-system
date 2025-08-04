package com.orderms.orderservice.controller;

import com.orderms.orderservice.model.Order;
import com.orderms.orderservice.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "*")
@Tag(name = "Order Management", description = "APIs for managing orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Create a new order", description = "Creates a new order with invoice file upload")
    public ResponseEntity<?> createOrder(
            @Parameter(description = "Customer name", required = true)
            @RequestParam @NotBlank String customerName,
            
            @Parameter(description = "Order amount", required = true)
            @RequestParam @NotNull @Positive Double orderAmount,
            
            @Parameter(description = "Invoice PDF file")
            @RequestParam(required = false) MultipartFile invoiceFile) {
        
        try {
            Order order = orderService.createOrder(customerName, orderAmount, invoiceFile);
            return ResponseEntity.status(HttpStatus.CREATED).body(order);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing file: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error creating order: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get order by ID", description = "Retrieves an order by its ID")
    public ResponseEntity<?> getOrderById(
            @Parameter(description = "Order ID", required = true)
            @PathVariable String id) {
        
        Optional<Order> order = orderService.getOrderById(id);
        if (order.isPresent()) {
            return ResponseEntity.ok(order.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Order not found with ID: " + id);
        }
    }

    @GetMapping
    @Operation(summary = "Get all orders", description = "Retrieves all orders")
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }
}
