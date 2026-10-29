package La.Bottega;
import java.util.List;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import La.Bottega.entity.Product;

@CrossOrigin(origins = {
	    "http://127.0.0.1:5500",
	    "http://localhost:5500"
	})
@RestController
public class ProductController {
	private final ProductService productService;
	public ProductController(ProductService productService) {
		this.productService = productService;
	}
	
	//GET - tutti i prodotti
	@GetMapping("/products")
	public List<Product> getProducts() {
		return productService.getAllProducts();
	}
	
	//get - prodotti in offerta
	@GetMapping("/products/offerte")
	public List<Product> getProductsInOfferta() {
		return productService.getProductsInOfferta();
	}
	
	//get - prodotto tramite id
	@GetMapping("/products/{id}")
	public Product getProduct(@PathVariable Long id) {
		return productService.getProductById(id);
	}
	
	//post - aggiungere prodotto
	@PostMapping("/products")
	public Product addProduct(@RequestBody Product product) {
		return productService.saveProduct(product);
	}
	
	@PutMapping("/products/{id}")
	public Product updateProduct(
			@PathVariable Long id,
			@RequestBody Product product) {
		Product existingProduct = productService.getProductById(id);
		
		if (existingProduct == null) {
			return null;
		}
		
		existingProduct.setNome(product.getNome());
		existingProduct.setCategoria(product.getCategoria());
		existingProduct.setPrezzo(product.getPrezzo());
		existingProduct.setPrezzoScontato(product.getPrezzoScontato());
		existingProduct.setInOfferta(product.isInOfferta());
		existingProduct.setQuantita(product.getQuantita());
		existingProduct.setDataScadenza(product.getDataScadenza());
		existingProduct.setDescrizione(product.getDescrizione());
		existingProduct.setImmagine(product.getImmagine());
		
		return productService.saveProduct(existingProduct);
		
	}
	
	
	//delete - elimina un prodotto
	@DeleteMapping("/products/{id}")
	public void deleteProduct(@PathVariable Long id) {
		productService.deleteProduct(id);
	}

}
