//LA BOTTEGA - PAGINA OFFERTE

const OFFERTE_API_URL = "http://localhost:8080/products/offerte";

//CARICAMENTO DEI PRODOTTI IN OFFERTA
async function loadOfferte() {
    const container = document.getElementById("products");

    try{
        const response = await fetch(OFFERTE_API_URL);
        if (!response.ok) {
            throw new Error("Errore nel caricamento");
        }

        const offerte = await response.json();
        container.innerHTML = "";

        if (offerte.length === 0) {
            container.innerHTML = `
                <div class="nessun-prodotto">
                    <i class="fa-solid fa-tag"></i>
                    <h3>Al momento non ci sono offerte</h3>
                    <p>Stiamo preparando nuove occasioni per te!</p>
                    <a href="CATALOGO.HTML" class="btn-primary">
                        Scopri tutti i prodotti
                    </a>
                </div>
            `;
            return;
        }
        //CREAZIONE DELLE CARD DEI PRODOTTI
        offerte.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("card");

            const immagine = document.createElement("img");
            immagine.src = product.immagine || "";
            immagine.alt = product.nome || "Prodotto in offerta";

            const contenuto = document.createElement("div");
            contenuto.classList.add("card-content");

            const nome = document.createElement("h4");
            nome.textContent = product.nome;

            const categoria = document.createElement("p");
            categoria.classList.add("brand");
            categoria.textContent = product.categoria;

            const descrizione = document.createElement("p");
            descrizione.classList.add("descrizione");
            descrizione.textContent = product.descrizione || "";

            const prezzo = document.createElement("p");
            prezzo.classList.add("prezzo");

            const prezzoOriginale = Number(product.prezzo);
            const prezzoScontato = Number(product.prezzoScontato);

            //CONTROLLO DELLO SCONTO
            if (
                product.inOfferta &&
                Number.isFinite(prezzoScontato) &&
                prezzoScontato > 0 &&
                prezzoScontato < prezzoOriginale
            ) {
                prezzo.innerHTML = `
        <span class="prezzo-originale">
            € ${prezzoOriginale.toFixed(2)}
        </span>
        <strong class="prezzo-scontato">
            € ${prezzoScontato.toFixed(2)}
        </strong>
    `;
            } else {
                prezzo.textContent = `€ ${prezzoOriginale.toFixed(2)}`;
            }

            //DISPONIBILITÀ

            const disponibilita = document.createElement("p");
            disponibilita.textContent =   `Disponibili: ${product.quantita}`;

            //PULSANTE AGGIUNGI AL CARRELLO

            const pulsante = document.createElement("button");
            pulsante.textContent = "Aggiungi al carrello";
            pulsante.addEventListener("click", () => {
            addToCart(product);
            });

            //INSERIMENTO DELLE INFORMAZIONI NELLA CARD
            contenuto.append(
                nome,
                categoria,
                descrizione,
                prezzo,
                disponibilita,
                pulsante
            );

            card.append(immagine, contenuto);
            container.appendChild(card);
        });
    } catch (error) {

        //GESTIONE DEGLI ERRORI
        
        console.error("Errore nel caricamento", error);
        container.innerHTML = `
            <p class="errore-prodotti">
                Impossibile caricare le offerte.
                Controlla che Spring Boot sia avviato.
            </p>
        `;
    }
    
}

document.addEventListener("DOMContentLoaded", loadOfferte);