const cartItemsContainer = document.querySelector('.cart-items');

const cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
    cartItemsContainer.innerHTML = ''; 
    cart.forEach((product) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width: 100px; height: 100px; object-fit: cover;">
            <div class="item-details">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>$${product.price} MXN</p>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn" onclick="updateQuantity('${product.name}', -1)">-</button>
                <input type="number" value="${product.quantity}" min="1" readonly style="width: 50px; text-align: center;">
                <button class="quantity-btn" onclick="updateQuantity('${product.name}', 1)">+</button>
            </div>
            <p>$${(product.price * product.quantity).toFixed(2)} MXN</p>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateSummary(); 
}

function updateQuantity(productName, change) {
    const product = cart.find((item) => item.name === productName);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            cart.splice(cart.indexOf(product), 1); 
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function updateSummary() {
    const subtotal = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
    document.querySelector('.cart-summary').innerHTML = `
        <h2>Resumen de Compra</h2>
        <p>Subtotal: $${subtotal.toFixed(2)} MXN</p>
        <p>Envío: $150 MXN</p>
        <p><strong>Total: $${(subtotal + 150).toFixed(2)} MXN</strong></p>
        <button class="checkout-btn">Finalizar Compra</button>
    `;
}

renderCart();
