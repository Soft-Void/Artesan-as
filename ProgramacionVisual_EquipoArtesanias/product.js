
const addToCartButton = document.querySelector('.add-to-cart');


addToCartButton.addEventListener('click', (e) => {
    e.preventDefault(); 

    const productDetail = document.querySelector('.product-detail-container');


    const product = {
        name: productDetail.getAttribute('data-name'),
        price: parseFloat(productDetail.getAttribute('data-price')),
        description: productDetail.getAttribute('data-description'),
        image: productDetail.getAttribute('data-image'),
        quantity: 1, 
    };

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find((item) => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    window.location.href = 'carrito.html';
});
