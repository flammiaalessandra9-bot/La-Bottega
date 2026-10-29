//LA BOTTEGA - PAGINA ACCOUNT

//STORICO ORDINI
document.addEventListener("DOMContentLoaded", () => {
    const ordersTableBody = document.getElementById("ordersTableBody");
    if(!ordersTableBody) {
        return;
    }

    loadOrders();
});

//caricamento oridini dal backend
async function loadOrders() {
    const ordersTableBody = document.getElementById("ordersTableBody");
    try {
        const response = await fetch("http://localhost:8080/orders");
        if(!response.ok) {
            throw new Error ("Errore nel caricamento.");
        }

        const orders = await response.json();
        console.log("Ordini caricati dal backend: ", orders);
       
        if (orders.length === 0) {
            ordersTableBody.innerHTML = `
                <tr>
                    <td colspan="4">
                        Non hai ancora effettuato ordini.
                    </td>
                </tr>
            `;
            return;
        }

        //ordini dal più recente al più vecchio
        orders.sort((a, b) => {
            if(!a.dataOrdine) return 1;
            if(!b.dataOrdine) return -1;

            return new Date(b.dataOrdine) - new Date(a.dataOrdine);

        });

        //crea le righe della tabella
        ordersTableBody.innerHTML = orders.map(order => {
            let data = "-";
            if(orders.dataOrdine) {
                const dataOrdine = new Date(order.dataOrdine);
                data = dataOrdine.toLocaleDateString("it-IT");
            }

            const stato = order.stato || "confermato";
            const totale = Number(order.totale).toFixed(2);
            return `
                <tr>

                    <td>
                        #${order.id}
                    </td>

                    <td>
                        ${data}
                    </td>

                    <td>
                        <span class="status">
                            ${stato}
                        </span>
                    </td>

                    <td>
                        €${totale}
                    </td>

                </tr>
            `;
        }).join("");
    }catch (error) {
        console.error(
            "Errore durante il caricamento.",
            error
        );

        ordersTableBody.innerHTML = `
            <tr>
                <td colspan="4">
                    Impossibile caricare gli ordini.
                </td>
            </tr>
        `;

    }
    
}