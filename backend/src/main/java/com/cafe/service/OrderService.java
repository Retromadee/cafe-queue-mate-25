package com.cafe.service;

import com.cafe.model.Order;
import com.cafe.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class OrderService {
    
    @Autowired
    private OrderRepository orderRepository;
    
    public Order createOrder(Order order) {
        order.setTimestamp(LocalDateTime.now());
        order.setStatus("pending");
        order.setQueueNumber(generateQueueNumber());
        return orderRepository.save(order);
    }
    
    public List<Order> getKitchenOrders() {
        return orderRepository.findByStatus("pending");
    }
    
    private int generateQueueNumber() {
        return new Random().nextInt(100) + 1;
    }
}