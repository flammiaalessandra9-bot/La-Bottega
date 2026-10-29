package La.Bottega.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

//hibernate vede entity e capisce che questa classe deve essere 
//collegata a una tabella del database.
@Entity
public class Product {
	@Id	//chiave primaria, dicendo a hibernate di creare l'ID
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String nome;
	private String categoria;
	private double prezzo;
	private double prezzoScontato;
	private boolean inOfferta;
	private double quantita;
	private String dataScadenza;
	private String descrizione;
	private String immagine;
	
	//COSTRUTTORE VUOTO
	public Product() {
	}
	
	//GETTER E SETTER
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
	
	public String getCategoria() {
		return categoria;
	}
	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}
	
	public double getPrezzo() {
		return prezzo;
	}
	public void setPrezzo(double prezzo) {
		this.prezzo = prezzo;
	}
	
	public double getPrezzoScontato() {
		return prezzoScontato;
	}
	
	public void setPrezzoScontato(double prezzoScontato) {
		this.prezzoScontato = prezzoScontato;
	}
	
	public double getQuantita() {
		return quantita;
	}
	public void setQuantita(double quantita) {
		this.quantita = quantita;
	}
	
	public String getDataScadenza() {
		return dataScadenza;
	}
	public void setDataScadenza(String dataScadenza) {
		this.dataScadenza = dataScadenza;
	}
	
	public String getDescrizione() {
		return descrizione;
	}
	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
	}
	
	public String getImmagine() {
		return immagine;
	}
	public void setImmagine(String immagine) {
		this.immagine = immagine;
	}
	
	public boolean isInOfferta() {
		return inOfferta;
	}
	public void setInOfferta(boolean inOfferta) {
		this.inOfferta = inOfferta;
	}
}
