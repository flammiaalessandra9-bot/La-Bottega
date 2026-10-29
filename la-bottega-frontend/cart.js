/* GESTIONE DEL CARRELLO */

/* 1. RECUPERO IL CARRELLO */

let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];

/* 2. SALVA IL CARRELLO */

function saveCart() {
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}

/* PREZZO EFFETTIVO DEL RPODOTTO */

function getEffectivePrice(product) {
    const prezzoOriginale = Number(product.prezzo);
    const prezzoScontato = Number(product.prezzoScontato);

    if (
        product.inOfferta === true &&
        Number.isFinite(prezzoScontato) &&
        prezzoScontato > 0 &&
        prezzoScontato < prezzoOriginale
    ) {
        return prezzoScontato;
    }
    return prezzoOriginale;
}

/* 3. AGGIUNGI PRODOTTO */

function addToCart(productOrId) {

    let product;
    if (typeof productOrId === "object" && productOrId !== null) {
        product = productOrId;
    } else {
        product = Array.isArray(products)
            ? products.find(item => item.id === productOrId)
            : null;
    }
    if (!product) {
        console.error("Prodotto non trovato:", productOrId);
        return;
    }
    const existingProduct = cart.find(
        item => item.id === product.id
    );
    if (existingProduct) {
        
        const nuovaQuantita = existingProduct.quantity + 1;

        Object.assign(existingProduct, product);
        existingProduct.quantity = nuovaQuantita;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    saveCart();
    updateCartCount();
    renderCart();
}

/* 4. RIMUOVI PRODOTTO */
function removeFromCart(id) {
    cart = cart.filter(
        item => item.id !== id
    );
    saveCart();
    updateCartCount();
    renderCart();
}

/* 5. MODIFICA LA QUANTITÀ */

function changeQuantity(id, amount) {
    
    const product = cart.find(
        item => item.id === id
    );
    if (!product) {
        return;
    }
   
    product.quantity += amount;
    
    if (product.quantity <= 0) {
        removeFromCart(id);
        return;
    }
    saveCart();
    updateCartCount();
    renderCart();
}

/* 6. CALCOLA IL TOTALE */

function getTotal() {
    return cart.reduce(
        (total, item) => {
            return total +
                getEffectivePrice(item) * item.quantity;
        },
        0
    );
}

/* 7. AGGIORNA CONTATORE HEADER */

function updateCartCount() {
    const counter =
        document.getElementById("cartCount");

    if (!counter) {
        return;
    }
    const totalItems = cart.reduce(
        (total, item) => {
            return total +
                item.quantity;
        },
        0
    );

    counter.textContent = totalItems;
}

/* 8. RENDER DEL CARRELLO */

function renderCart() {
    const container =
        document.getElementById("cartProducts");
    
    if (!container) {
        return;
    }

    /* CARRELLO VUOTO */

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <h3>
                    Il tuo carrello è vuoto
                </h3>
                <p>
                    Non hai ancora aggiunto prodotti
                    al carrello.
                </p>
                <a
                    href="CATALOGO.HTML"
                    class="btn-primary"
                >
                    Scopri i prodotti
                </a>
            </div>
        `;
        updateCartSummary();
        return;
    }

    /* PULISCE IL CONTENITORE */

    container.innerHTML = "";

    /* CREA LE CARD DEI PRODOTTI */

    cart.forEach(item => {
        
        const prezzoEffettivo = getEffectivePrice(item);
        const subtotal = prezzoEffettivo * item.quantity;
        
container.innerHTML += `
    <div class="card-carrello">

        <div class="prodotto-info">
            <div class="immagine-prodotto">
                <img
                    src="${item.immagine || ""}"
                    alt="${item.nome}"
                >
            </div>

            <div class="info-prodotto">
                <h3>${item.nome}</h3>
                <span>${item.categoria || ""}</span>
            </div>
        </div>

        <div class="prezzo">
            ${
                item.inOfferta &&
                prezzoEffettivo < Number(item.prezzo)
                ? `
                    <span class="prezzo-originale">
                        €${Number(item.prezzo).toFixed(2)}
                    </span>
                    <strong class="prezzo-scontato">
                        €${prezzoEffettivo.toFixed(2)}
                    </strong>
                `
                : `€${prezzoEffettivo.toFixed(2)}`
            }
        </div>

        <div class="qty">
            <button
                type="button"
                onclick="changeQuantity(${item.id}, -1)"
                aria-label="Diminuisci quantità"
            >−</button>

            <input
                type="number"
                value="${item.quantity}"
                min="1"
                readonly
            >

            <button
                type="button"
                onclick="changeQuantity(${item.id}, 1)"
                aria-label="Aumenta quantità"
            >+</button>
        </div>

        <div class="subtotal">
            €${subtotal.toFixed(2)}
        </div>

        <i
            class="fa-solid fa-trash remove-product"
            onclick="removeFromCart(${item.id})"
            title="Rimuovi prodotto"
        ></i>

    </div>
        `;
    });
    
    updateCartSummary();
}

/* 9. AGGIORNA RIEPILOGO */

function updateCartSummary() {
   
    const subtotal = getTotal();
   
    let shipping = 0;
    if (subtotal > 0 && subtotal < 49) {
        shipping = 4.90;
    }
    
    const total = subtotal + shipping;
    
    const subtotalElement =
        document.getElementById("cartSubtotal");
    const shippingElement =
        document.getElementById("cartShipping");
    const totalElement =
        document.getElementById("cartTotal");
   
    if (subtotalElement) {
        subtotalElement.textContent =
            "€" + subtotal.toFixed(2);
    }
    
    if (shippingElement) {
        shippingElement.textContent =
            shipping === 0 && subtotal >= 49
                ? "Gratis"
                : "€" + shipping.toFixed(2);

    }
   
    if (totalElement) {
        totalElement.textContent =
            "€" + total.toFixed(2);
    }
}

/* 10. AVVIO */

document.addEventListener(
    "DOMContentLoaded",
    function () {
        updateCartCount();
        renderCart();
    }
);

