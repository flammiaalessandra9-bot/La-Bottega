package La.Bottega;
import java.util.List;
import org.springframework.stereotype.Service;

import La.Bottega.entity.Product;
import La.Bottega.repository.ProductRepository;

@Service	//dice a Spring che la classe contiene la logica 
public class ProductService {
	private final ProductRepository productRepository;
	//ProductService ha bisogno di ProductRepository per lavorare con i prodotti
	
	public ProductService(ProductRepository productRepository) {
		this.productRepository = productRepository;
	} //contruttore, fornisce Productrepositorya  ProductService - dependency injection
	
	//reucpera tutti i prodotti
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}
	
	//recupera i prodotti in offerta
	public List<Product> getProductsInOfferta() {
		return productRepository.findByInOffertaTrue();
	}
	
	//recupera un prodotto tramite id
	public Product getProductById(Long id) {
		return productRepository.findById(id).orElse(null);
		
	}
	
	//salva un nuovo prodotto
	public Product saveProduct(Product product) {
		return productRepository.save(product);
	}
	
	//elimina prodotto
	public void deleteProduct(Long id) {
		productRepository.deleteById(id);
	}

}
