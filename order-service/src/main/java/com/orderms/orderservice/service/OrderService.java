package com.orderms.orderservice.service;

import com.orderms.orderservice.model.Order;
import com.orderms.orderservice.repository.InMemoryOrderRepository;
import com.orderms.orderservice.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Value("${aws.local-development:false}")
    private boolean localDevelopment;

    @Autowired(required = false)
    private OrderRepository orderRepository;
    
    @Autowired(required = false)
    private InMemoryOrderRepository inMemoryOrderRepository;

    @Autowired(required = false)
    private S3Service s3Service;
    
    @Autowired(required = false)
    private MockS3Service mockS3Service;

    @Autowired(required = false)
    private SnsService snsService;
    
    @Autowired(required = false)
    private MockSnsService mockSnsService;

    public Order createOrder(String customerName, Double orderAmount, MultipartFile invoiceFile) throws IOException {
        Order order = new Order(customerName, orderAmount);
        
        // Upload invoice to S3 if provided
        if (invoiceFile != null && !invoiceFile.isEmpty()) {
            String fileUrl;
            if (localDevelopment && mockS3Service != null) {
                fileUrl = mockS3Service.uploadFile(invoiceFile, order.getOrderId());
            } else if (s3Service != null) {
                fileUrl = s3Service.uploadFile(invoiceFile, order.getOrderId());
            } else {
                // Fallback - create a mock URL
                fileUrl = "https://mock-bucket.s3.amazonaws.com/invoices/" + order.getOrderId() + "_" + invoiceFile.getOriginalFilename();
            }
            order.setInvoiceFileUrl(fileUrl);
        }
        
        // Save order to repository
        Order savedOrder;
        if (localDevelopment && inMemoryOrderRepository != null) {
            savedOrder = inMemoryOrderRepository.save(order);
        } else if (orderRepository != null) {
            savedOrder = orderRepository.save(order);
        } else {
            // Fallback - just return the order (for demo purposes)
            savedOrder = order;
        }
        
        // Send SNS notification
        if (localDevelopment && mockSnsService != null) {
            mockSnsService.sendOrderNotification(savedOrder.getOrderId(), savedOrder.getCustomerName(), savedOrder.getOrderAmount());
        } else if (snsService != null) {
            snsService.sendOrderNotification(savedOrder.getOrderId(), savedOrder.getCustomerName(), savedOrder.getOrderAmount());
        }
        
        return savedOrder;
    }

    public Optional<Order> getOrderById(String orderId) {
        if (localDevelopment && inMemoryOrderRepository != null) {
            return inMemoryOrderRepository.findById(orderId);
        } else if (orderRepository != null) {
            return orderRepository.findById(orderId);
        }
        return Optional.empty();
    }

    public List<Order> getAllOrders() {
        if (localDevelopment && inMemoryOrderRepository != null) {
            return inMemoryOrderRepository.findAll();
        } else if (orderRepository != null) {
            return orderRepository.findAll();
        }
        return List.of(); // Return empty list as fallback
    }
}
