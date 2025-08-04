package com.orderms.orderservice.repository;

import com.orderms.orderservice.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.enhanced.dynamodb.model.ScanEnhancedRequest;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class OrderRepository {

    private final DynamoDbTable<Order> orderTable;

    @Autowired
    public OrderRepository(DynamoDbEnhancedClient enhancedClient, 
                          @Value("${aws.dynamodb.orders-table:Orders}") String tableName) {
        this.orderTable = enhancedClient.table(tableName, TableSchema.fromBean(Order.class));
    }

    public Order save(Order order) {
        orderTable.putItem(order);
        return order;
    }

    public Optional<Order> findById(String orderId) {
        Key key = Key.builder().partitionValue(orderId).build();
        Order order = orderTable.getItem(key);
        return Optional.ofNullable(order);
    }

    public List<Order> findAll() {
        return orderTable.scan(ScanEnhancedRequest.builder().build())
                .items()
                .stream()
                .collect(Collectors.toList());
    }
}
