package La.Bottega;

import java.util.List;
import org.springframework.stereotype.Service;

import La.Bottega.entity.Order;
import La.Bottega.repository.OrderRepository;

@Service
public class OrderService {
	
	private final OrderRepository orderRepository;
	public OrderService(OrderRepository orderRepository) {
		this.orderRepository = orderRepository;
	}

	//recupera tutti gli ordini
	public List<Order> findAll() {
		return orderRepository.findAll();
	}
	
	//recupera un ordine tramite id
	public Order findById(Long id) {
		return orderRepository.findById(id).orElse(null);
	}
	
	//salva un nuovo ordine
	public Order save(Order order) {
		return orderRepository.save(order);
	}
	
	//elimina un ordine
	public void deleteById(Long id) {
		orderRepository.deleteById(id);
	}
}
