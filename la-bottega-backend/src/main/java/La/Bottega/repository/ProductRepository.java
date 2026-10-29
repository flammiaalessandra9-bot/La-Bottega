package La.Bottega.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import La.Bottega.entity.Product;
//tabella che permette la comunicazione tra spring e tabella db
public interface ProductRepository extends JpaRepository<Product, Long> {
	//"questo repository gestisce oggetti Product e il loro id è tipo Long
	//grazie a jpa repository spring fornisce automaticamente operazione come
	//findAll, findById, ecc.. così non serve sccrivere le query sql
	
	//recupera i prodotti in offerta
	List<Product> findByInOffertaTrue();
}
