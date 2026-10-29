/* SISTEMA FILTRI CATALOGO*/

/* 1. STATO DEI FILTRI */


let categoriaSelezionata = "Tutti";

// Fascia di prezzo
let prezzoMinimo = null;
let prezzoMassimo = null;

// Testo della ricerca
let testoRicerca = "";
let criterioOrdinamento = "popular";

/* CATEORIA RICEVUTA DALLA HOME*/
const parametriURL = new URLSearchParams(window.location.search);
const cateoriaURL = parametriURL.get("categoria");

if (cateoriaURL) {
    categoriaSelezionata = cateoriaURL;
}


/* 2. FUNZIONE CENTRALE DEI FILTRI */

function applicaFiltri() {

    let risultati = [...products];

    /* RICERCA */

    if (testoRicerca !== "") {
        risultati = risultati.filter(product => {
            return product.nome
                .toLowerCase()
                .includes(testoRicerca);
        });
    }

    /* CATEGORIA */

    if (categoriaSelezionata !== "Tutti") {
        risultati = risultati.filter(product => {
            return product.categoria &&
                   product.categoria.toLowerCase() ===
                   categoriaSelezionata.toLowerCase();
        });
    }

    /* PREZZO */

    if (prezzoMinimo !== null) {
        risultati = risultati.filter(product => {
            return Number(product.prezzo) >=
                   prezzoMinimo;
        });
    }

    if (prezzoMassimo !== null) {
        risultati = risultati.filter(product => {
            return Number(product.prezzo) <=
                   prezzoMassimo;
        });
    }

    /* ORDINAMENTO */

if (criterioOrdinamento === "price-asc") {
    risultati.sort((a, b) => {
        return Number(a.prezzo) -
               Number(b.prezzo);
    });
}

else if (criterioOrdinamento === "price-desc") {
    risultati.sort((a, b) => {
        return Number(b.prezzo) -
               Number(a.prezzo);
    });
}

/* VISUALIZZAZIONE */

renderProducts(risultati);
}


/* 3. RICERCA */

function filterSearch(searchValue) {
    testoRicerca = searchValue
        .trim()
        .toLowerCase();
    applicaFiltri();
}

/* 4. CATEGORIA */

function filterCategory(category) {
    console.log(
        "Categoria selezionata:",
        category
    );
    categoriaSelezionata = category;
    applicaFiltri();
}

/* 5. PREZZO */

function filterPrice(minPrice, maxPrice) {
    console.log(
        "Filtro prezzo:",
        minPrice,
        maxPrice
    );
    prezzoMinimo = minPrice;
    prezzoMassimo = maxPrice;
    applicaFiltri();
}

/* 6. BARRA DI RICERCA */

const searchInput =
    document.getElementById("searchInput");
if (searchInput) {
    searchInput.addEventListener(
        "input",
        function () {
            filterSearch(this.value);
        }
    );
}

/* 7. ORDINAMENTO */

const sortProducts =
    document.getElementById("sortProducts");
if (sortProducts) {
    sortProducts.addEventListener(
        "change",
        function () {
            criterioOrdinamento = this.value;
            applicaFiltri();
        }
    );
}