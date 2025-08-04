package com.orderms.orderservice.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;

import java.time.LocalDateTime;
import java.util.UUID;

@DynamoDbBean
public class Order {
    
    private String orderId;
    
    @NotBlank(message = "Customer name is required")
    private String customerName;
    
    @NotNull(message = "Order amount is required")
    @Positive(message = "Order amount must be positive")
    private Double orderAmount;
    
    private LocalDateTime orderDate;
    
    private String invoiceFileUrl;
    
    public Order() {
        this.orderId = UUID.randomUUID().toString();
        this.orderDate = LocalDateTime.now();
    }
    
    public Order(String customerName, Double orderAmount) {
        this();
        this.customerName = customerName;
        this.orderAmount = orderAmount;
    }
    
    @DynamoDbPartitionKey
    public String getOrderId() {
        return orderId;
    }
    
    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }
    
    public String getCustomerName() {
        return customerName;
    }
    
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
    
    public Double getOrderAmount() {
        return orderAmount;
    }
    
    public void setOrderAmount(Double orderAmount) {
        this.orderAmount = orderAmount;
    }
    
    public LocalDateTime getOrderDate() {
        return orderDate;
    }
    
    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }
    
    public String getInvoiceFileUrl() {
        return invoiceFileUrl;
    }
    
    public void setInvoiceFileUrl(String invoiceFileUrl) {
        this.invoiceFileUrl = invoiceFileUrl;
    }
}
