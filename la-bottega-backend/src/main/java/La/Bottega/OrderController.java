package La.Bottega;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import La.Bottega.entity.Order;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = {
        "http://localhost:5500",
        "http://127.0.0.1:5500"
})
public class OrderController {
	private final OrderService orderService;
	public OrderController(OrderService orderService) {
		this.orderService = orderService;
	}
	
	//recupera tutti gli ordini
	@GetMapping
	public List<Order> getALlOrders() {
		return orderService.findAll();
	}
	
	//recupera un ordine tramite Id
	@GetMapping("/{id}")
	public Order getOrderById(@PathVariable Long id) {
		return orderService.findById(id);
	}
	
	//crea nuovo ordine
	@PostMapping 
	public Order createOrder(@RequestBody Order order) {
		order.setDataOrdine(java.time.LocalDateTime.now().toString());
		order.setStato("Confermato");
		return orderService.save(order);
			
	}
	
	//elimina un ordine
	@DeleteMapping("/{id}")
	public void deleteOrder(@PathVariable Long id) {
		orderService.deleteById(id);
	}
}
