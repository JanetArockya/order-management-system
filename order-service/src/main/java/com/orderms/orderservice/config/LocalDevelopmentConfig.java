package com.orderms.orderservice.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("local")
@ConditionalOnProperty(name = "aws.local-development", havingValue = "true")
public class LocalDevelopmentConfig {
    
    // This configuration is used for local development without AWS
    // When aws.local-development=true, the app will use mock services
    
}
