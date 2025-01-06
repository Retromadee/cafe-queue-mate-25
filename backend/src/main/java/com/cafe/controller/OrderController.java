package com.cafe.controller;

import com.cafe.model.Order;
import com.cafe.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    
    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderService.createOrder(order);
    }
    
    @GetMapping("/kitchen")
    public List<Order> getKitchenOrders() {
        return orderService.getKitchenOrders();
    }

    @PutMapping("/{id}/status")
    public Order updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, String> status) {
        return orderService.updateOrderStatus(id, status.get("status"));
    }
}