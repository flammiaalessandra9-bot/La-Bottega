//  LA BOTTEGA - CHECKOUT 
let checkoutCart = JSON.parse(localStorage.getItem("cart")) || [];

function getCheckoutPrice(item) {
    const prezzoOriginale = Number(item.prezzo);
    const prezzoScontato = Number(item.prezzoScontato);

    if (
        item.inOfferta === true &&
        Number.isFinite(prezzoScontato) &&
        prezzoScontato > 0 &&
        prezzoScontato < prezzoOriginale
    ) {
        return prezzoScontato;
    }

    return prezzoOriginale;
}

// MOSTRA I PRODOTTI NEL CHECKOUT

function renderCheckoutProducts() {

    const container = document.getElementById("checkoutProducts");

    if (!container) return;

    if (checkoutCart.length === 0) {

        container.innerHTML = `
            <div class="carrello-vuoto">
                <h3>Il carrello è vuoto</h3>
                <p>Non ci sono prodotti nel carrello.</p>
                <a href="CATALOGO.HTML">Torna al catalogo</a>
            </div>
        `;

        return;
    }

    // Visualizza i prodotti
    container.innerHTML = checkoutCart.map(item => {

        const prezzo = getCheckoutPrice(item);
        const totaleProdotto = prezzo * item.quantity;

        return `
            <div class="checkout-product">

                <div class="checkout-product-info">

                    <img src="${item.immagine}"
                         alt="${item.nome}">

                    <div>
                        <h3>${item.nome}</h3>
                        <p>Quantità: ${item.quantity}</p>
                    </div>

                </div>

                <div class="checkout-product-price">
                    €${totaleProdotto.toFixed(2)}
                </div>

            </div>
        `;

    }).join("");
}

// CALCOLA IL SUBTOTALE

function getCheckoutSubtotal() {
    return checkoutCart.reduce((totale, item) => {
        return totale + getCheckoutPrice(item) * item.quantity;
    }, 0);
}

// GGIORNA IL RIEPILOGO

function updateCheckoutSummary() {

    const subtotal = getCheckoutSubtotal();
    let shipping = 0;

    if (subtotal > 0 && subtotal < 49) {
        shipping = 4.90;
    }

    const total = subtotal + shipping;

    const subtotalElement =
        document.getElementById("checkoutSubtotal");

    const shippingElement =
        document.getElementById("checkoutShipping");

    const totalElement =
        document.getElementById("checkoutTotal");

    if (subtotalElement) {

        subtotalElement.textContent =
            "€" + subtotal.toFixed(2);
    }

    if (shippingElement) {

        if (subtotal >= 49) {
            shippingElement.textContent = "Gratis";
        } else {
            shippingElement.textContent =
                "€" + shipping.toFixed(2);
        }
    }

    if (totalElement) {
        totalElement.textContent =
            "€" + total.toFixed(2);
    }
}

// INIZIALIZZAZIONE CHECKOUT

document.addEventListener("DOMContentLoaded", () => {

    renderCheckoutProducts();
    updateCheckoutSummary();

});

// CONFERMA DELL'ORDINE

document.addEventListener("DOMContentLoaded", () => {

    const checkoutForm =
        document.getElementById("checkoutForm");

    if (!checkoutForm) return;

    checkoutForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        if (checkoutCart.length === 0) {
            alert("Il carrello è vuoto.");
            return;
        }

        if (!checkoutForm.checkValidity()) {
            checkoutForm.reportValidity();
            return;
        }

        const pagamentoElement =
            document.querySelector(
                'input[name="pagamento"]:checked'
            );

        if (!pagamentoElement) {
            alert("Seleziona un metodo di pagamento.");
            return;
        }

        const pagamento =
            pagamentoElement.value;

        const nome =
            document.getElementById("nome").value;

        const subtotal =
            getCheckoutSubtotal();

        let shipping = 0;

        if (subtotal > 0 && subtotal < 49) {
            shipping = 4.90;
        }

        const total =
            subtotal + shipping;

        // CREA L'OGGETTO ORDINE

        const order = {

            nome:
                document.getElementById("nome").value,

            cognome:
                document.getElementById("cognome").value,

            email:
                document.getElementById("email").value,

            telefono:
                document.getElementById("telefono").value,

            indirizzo:
                document.getElementById("indirizzo").value,

            cap:
                document.getElementById("cap").value,

            citta:
                document.getElementById("citta").value,

            provincia:
                document.getElementById("provincia").value,

            pagamento:
                pagamento,

            totale:
                total
        };

        // INVIA L'ORDINE A SPRING BOOT

        try {

            const response =
                await fetch("http://localhost:8080/orders", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(order)

                });

            if (!response.ok) {

                throw new Error(
                    "Errore durante l'invio dell'ordine."
                );
            }

            const savedOrder =
                await response.json();

            // MOSTRA CONFERMA

            alert(

                "Ordine confermato!\n\n" +

                "Numero ordine: "
                + savedOrder.id
                + "\n" +

                "Cliente: "
                + nome
                + "\n" +

                "Pagamento: "
                + pagamento
                + "\n" +

                "Totale: €"
                + savedOrder.totale.toFixed(2)
                + "\n\n" +

                "Grazie per aver scelto La Bottega!"

            );

            localStorage.removeItem("cart");

            window.location.href =
                "INDEX.HTML";

        } catch (error) {

            console.error(
                "Errore durante la conferma dell'ordine:",
                error
            );

            alert(
                "Si è verificato un errore durante la conferma dell'ordine."
            );
        }

    });

});