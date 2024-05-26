const Products = [
    { id: 1, name: 'GlowLite', price: 100 },
    { id: 2, name: 'AeroBand', price: 200 },
    { id: 3, name: 'NovaTrek', price: 300 },
];

let cart = [];

function renderProductList() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    Products.forEach(product => {
        const li = document.createElement('li');
        li.classList.add('product-item');
        li.innerHTML = `
        ${product.name} - ${product.price}
        <button onclick="removeFromCart(${product.id})">-</button>
        <span id="quantity-${product.id}"> 0 </span>
        <button onclick="addToCart(${product.id})">+</button>`;
        productList.appendChild(li);
    });
}

function renderCart() {
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';
    let totalPrice = 0;
    if (cart.length === 0) {
        document.getElementById('cartStatus').innerText = 'No Product added to the cart';
    } else {
        document.getElementById('cartStatus').innerText = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('cart-item');
            li.innerText = `${item.name} - Quantity: ${item.quantity} - Total: ${item.quantity * item.price}`;
            cartList.appendChild(li);
            totalPrice += item.quantity * item.price;
        });
    }
    document.getElementById('totalAmount').innerText = `Total Amount: ${totalPrice}`;
}

function addToCart(productId) {
    const productToAdd = Products.find(product => product.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ id: productId, name: productToAdd.name, price: productToAdd.price, quantity: 1 });
    }
    renderCart();
    updateQuantity(productId);
}

function removeFromCart(productId) {
    const cartItemIndex = cart.findIndex(item => item.id === productId);
    if (cartItemIndex !== -1) {
        const cartItem = cart[cartItemIndex];
        if (cartItem.quantity > 1) {
            cartItem.quantity--;
        } else {
            cart.splice(cartItemIndex, 1);
        }
        renderCart();
        updateQuantity(productId);
    }
}

function updateQuantity(productId) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        quantityElement.innerText = cartItem.quantity;
    } else {
        quantityElement.innerText = '0';
    }
}

renderProductList();
renderCart();