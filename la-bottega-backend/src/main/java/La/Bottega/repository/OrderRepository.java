package La.Bottega.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import La.Bottega.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
