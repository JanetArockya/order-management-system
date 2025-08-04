package com.orderms.orderservice.service;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@ConditionalOnProperty(name = "aws.local-development", havingValue = "true")
public class MockS3Service {

    public String uploadFile(MultipartFile file, String orderId) throws IOException {
        // Mock implementation - return a fake URL
        String fileName = file.getOriginalFilename();
        return String.format("https://mock-bucket.s3.amazonaws.com/invoices/%s_%s", orderId, fileName);
    }
}
