package com.orderms.orderservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.sns.SnsClient;
import software.amazon.awssdk.services.sns.model.PublishRequest;
import software.amazon.awssdk.services.sns.model.PublishResponse;

@Service
public class SnsService {

    private final SnsClient snsClient;
    
    @Value("${aws.sns.topic-arn}")
    private String topicArn;

    @Autowired
    public SnsService(SnsClient snsClient) {
        this.snsClient = snsClient;
    }

    public void sendOrderNotification(String orderId, String customerName, Double orderAmount) {
        String message = String.format(
            "New Order Created!\nOrder ID: %s\nCustomer: %s\nAmount: $%.2f",
            orderId, customerName, orderAmount
        );

        PublishRequest publishRequest = PublishRequest.builder()
                .topicArn(topicArn)
                .message(message)
                .subject("New Order Notification")
                .build();

        PublishResponse response = snsClient.publish(publishRequest);
        System.out.println("SNS Message sent with ID: " + response.messageId());
    }
}
