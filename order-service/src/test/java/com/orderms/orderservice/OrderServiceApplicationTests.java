package com.orderms.orderservice;

import com.orderms.orderservice.controller.OrderController;
import com.orderms.orderservice.service.OrderService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class OrderServiceApplicationTests {

	@Autowired
	private OrderController orderController;

	@MockBean
	private OrderService orderService;

	@Test
	void contextLoads() {
		assertThat(orderController).isNotNull();
	}

}
