package La.Bottega.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="orders")
public class Order {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String nome;
	private String cognome;
	private String email;
	private String telefono;
	
	private String indirizzo;
	private String cap;
	private String citta;
	private String provincia;
	
	private String pagamento;
	
	private double totale;
	
	private String dataOrdine;
	private String stato;
	
	public Order() {
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public String getCognome() {
		return cognome;
	}
	
	public void setCognome(String cognome) {
		this.cognome = cognome;
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getTelefono() {
		return telefono;
	}
	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}
	
	public String getIndirizzo() {
		return indirizzo;
	}
	public void setIndirizzo(String indirizzo) {
		this.indirizzo = indirizzo;
	}
	
	public String getCap() {
		return cap;
	}
	public void setCap(String cap) {
		this.cap = cap;
	}
	
	public String getCitta() {
		return citta;
	}
	public void setCitta(String citta) {
		this.citta = citta;
	}
	
	public String getProvincia() {
		return provincia;
	}
	public void setProvincia(String provincia) { this.provincia = provincia;}
	
	public String getPagamento() {return pagamento;}
	public void setPagamento(String pagamento) {this.pagamento = pagamento;}
	
	public double getTotale() {return totale;}
	public void setTotale(double totale) {this.totale = totale;}
	
	public String getDataOrdine() { return dataOrdine; }
	public void setDataOrdine(String dataOrdine) {
		this.dataOrdine = dataOrdine;
	}
	
	public String getStato() { return stato; }
	public void setStato( String stato) { this.stato = stato; }

}
