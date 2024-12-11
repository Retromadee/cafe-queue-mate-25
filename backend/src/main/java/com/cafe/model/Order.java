package com.cafe.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Integer queueNumber;
    private String status;
    private Double totalAmount;
    private LocalDateTime timestamp;
    
    @OneToMany(cascade = CascadeType.ALL)
    private List<OrderItem> items;
}