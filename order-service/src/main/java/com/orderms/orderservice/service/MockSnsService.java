package com.orderms.orderservice.service;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

@Service
@ConditionalOnProperty(name = "aws.local-development", havingValue = "true")
public class MockSnsService {

    public void sendOrderNotification(String orderId, String customerName, Double orderAmount) {
        // Mock implementation - just log the notification
        System.out.println("=== MOCK SNS NOTIFICATION ===");
        System.out.println("New Order Created!");
        System.out.printf("Order ID: %s%n", orderId);
        System.out.printf("Customer: %s%n", customerName);
        System.out.printf("Amount: $%.2f%n", orderAmount);
        System.out.println("==============================");
    }
}
