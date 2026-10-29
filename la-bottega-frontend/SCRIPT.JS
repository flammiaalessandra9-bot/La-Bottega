// DATI PRODOTTI 

const products = [          
    {
        id: 1,
        name: "Pasta Integrale Bio",
        price: 1.49,
        category: "Dispensa",
        bio: true,
        glutenFree: false,
        vegan: false,
        image: "pasta bio.jpeg"
    },

    {
        id: 2,
        name: "Latte Fresco",
        price: 1.99,
        category: "Latticini e Uova",
        bio: false,
        glutenFree: false,
        vegan: false,
        image: "latte.jpg"
    },

    {
        id: 3,
        name: "Succo Arancia Bio",
        price: 2.50,
        category: "Bevande",
        bio: true,
        glutenFree: true,
        vegan: true,
        image: "succo.jpg"
    }
];

// RENDER PRODOTTI

function renderProducts(list) {     

    const container = document.getElementById("products");
    container.innerHTML = "";
    list.forEach(p => {
        container.innerHTML += `
            <div class="card">

                ${p.bio ? '<span class="badge bio">Bio</span>' : ""}

                <img src="${p.image}" alt="${p.name}">

                <h4>${p.name}</h4>

                <p class="brand">La Bottega</p>

                <p class="prezzo">€ ${p.price.toFixed(2)}</p>

                <button onclick="addToCart(${p.id})">
                    Aggiungi al carrello
                </button>

            </div>
        `;
    });
}
renderProducts(products);

// RICERCA

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", function () {
        const value = this.value.toLowerCase();
        const results = products.filter(product =>
            product.name.toLowerCase().includes(value)
        );    
        renderProducts(results);
    });

}


// FILTRO CATEGORIA

function filterCategory(category) {

    if (category === "Tutti") {
        renderProducts(products);
        return;
    }

    const filtered = products.filter(product =>
        product.category === category
    );
    renderProducts(filtered);
}

// FILTRO PREZZO

function filterPrice(maxPrice) {

    const filtered = products.filter(product =>
        product.price <= maxPrice
    );
    renderProducts(filtered);
}

// CARRELLO

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// AGGIUNGI AL CARRELLO

function addToCart(id) {

    const product = products.find(product => product.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity++;
    }

    else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    renderCart();
    updateCartCount();
}

// RIMUOVI DAL CARRELLO

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
    updateCartCount();
}

// MODIFICA QUANTITÀ

function changeQuantity(id, amount) {
    const item = cart.find(item => item.id === id);
    if (!item) return;
    item.quantity += amount;
    if (item.quantity <= 0) {
        removeFromCart(id);
        return;
    }

    saveCart();
    renderCart();
    updateCartCount();
}

// TOTALE

function getTotal() {

    return cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);
}

// SALVATAGGIO LOCAL STORAGE

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// CONTATORE CARRELLO

function updateCartCount() {
    const counter = document.getElementById("cartCount");
    if (!counter) return;
    const totalItems = cart.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);
    counter.innerText = totalItems;
}

updateCartCount();

// RENDER CARRELLO

function renderCart() {
    const container = document.getElementById("cart");
    if (!container) return;
    container.innerHTML = "";
    cart.forEach(item => {
        container.innerHTML += `
        <div class="cart-item">

            <h4>${item.name}</h4>

            <p>€ ${item.price.toFixed(2)}</p>

            <div class="quantity-controls">

                <button onclick="changeQuantity(${item.id}, -1)">−</button>

                <span>${item.quantity}</span>

                <button onclick="changeQuantity(${item.id}, 1)">+</button>

            </div>

            <button onclick="removeFromCart(${item.id})">
                Rimuovi
            </button>

        </div>

        `;
    });
    const total = document.getElementById("total");

    if (total) {
        total.innerText = "Totale: € " + getTotal().toFixed(2);
    }
}

renderCart();

function goToCategory(category) {
    localStorage.setItem("selectedCategory", category);
    window.location.href = "CATALOGO.HTML";
}
const selectedCategory = localStorage.getItem("selectedCategory");

if (selectedCategory && selectedCategory !== "Tutti") {
    filterCategory(selectedCategory);
}