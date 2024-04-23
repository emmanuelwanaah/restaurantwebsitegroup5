
// Get references to DOM elements
let carticon = document.getElementById('cart-icon');
let cart = document.querySelector('.cart');
let closecart = document.getElementById('close-cart');

// Event listener to toggle cart visibility
carticon.addEventListener('click', () => {
    cart.classList.add('active');
});

// Event listener to close cart
closecart.addEventListener('click', () => {
    cart.classList.remove('active');
});

// Function to initialize when DOM is ready
document.addEventListener('DOMContentLoaded', ready);

function ready() {
    // Add event listeners for "Add to Cart" buttons
    var addCartButtons = document.querySelectorAll(".add-cart");
    addCartButtons.forEach(button => {
        button.addEventListener('click', addCartClicked);
    });

    // Load cart items from local storage
    loadCartItems();
}

// Function to handle "Add to Cart" button click
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.closest('.food-menu-card'); // Find the closest parent element with the class 'food-menu-card'
    var titleElement = shopProducts.querySelector('.card-title'); // Change to '.card-title' if it's the correct class
    var priceElement = shopProducts.querySelector('.price');
    var productImgElement = shopProducts.querySelector('.product-img');
    
    // Check if any of the required elements are null
    if (!titleElement || !priceElement || !productImgElement) {
        console.error('Required elements not found.');
        return;
    }
    
    var title = titleElement.innerText;
    var price = priceElement.innerText;
    var productImg = productImgElement.src;
    addProductToCart(title, price, productImg);
    updateTotal();
    saveCartItems();
    updateCartIcon();
}

// Function to add product to cart
// Function to add product to cart
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.querySelector('.cart-content');
    var cartItemsNames = cartItems.querySelectorAll('.cart-product-title');

    cartItemsNames.forEach(cartItem => {
        if (cartItem.innerText == title) {
            alert('You have already added this item to your cart');
            return;
        }
    });

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" name="" id="" value="1" class="cart-quantity">
        </div>
        <i class='bx bx-trash-alt cart-remove'></i>
    `;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    var removeButton = cartShopBox.querySelector('.cart-remove');
    removeButton.addEventListener('click', removeCartItem);

    var quantityInput = cartShopBox.querySelector('.cart-quantity');
    quantityInput.addEventListener('change', quantityChanged);

    // Show alert message
    alert('Item added to cart: ' + title);
}

// Function to remove item from cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
    saveCartItems();
    updateCartIcon();
}

// Function to handle quantity change
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
    saveCartItems();
    updateCartIcon();
}

// Function to update total price
function updateTotal() {
    var cartContent = document.querySelector(".cart-content");
    var cartBoxes = cartContent.querySelectorAll(".cart-box");
    var total = 0;

    cartBoxes.forEach(cartBox => {
        var priceElement = cartBox.querySelector(".cart-price");
        var quantityElement = cartBox.querySelector(".cart-quantity");
        var price = parseFloat(priceElement.innerText.replace("₵", ""));
        var quantity = quantityElement.value;
        total += price * quantity;
    });

    total = Math.round(total * 100) / 100;
    document.querySelector(".total-price").innerText = "₵" + total;
    localStorage.setItem('cartTotal', total);
}

// Function to save cart items to local storage
function saveCartItems() {
    var cartContent = document.querySelector(".cart-content");
    var cartBoxes = cartContent.querySelectorAll('.cart-box');
    var cartItems = [];

    cartBoxes.forEach(cartBox => {
        var titleElement = cartBox.querySelector('.cart-product-title');
        var priceElement = cartBox.querySelector('.cart-price');
        var quantityElement = cartBox.querySelector('.cart-quantity');
        var productImg = cartBox.querySelector('.cart-img').src;

        var item = {
            title: titleElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElement.value,
            productImg: productImg,
        };
        cartItems.push(item);
    });

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to load cart items from local storage
function loadCartItems() {
    var cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        cartItems = JSON.parse(cartItems);

        cartItems.forEach(item => {
            addProductToCart(item.title, item.price, item.productImg);
            var cartBoxes = document.querySelectorAll('.cart-box');
            var cartBox = cartBoxes[cartBoxes.length - 1];
            var quantityElement = cartBox.querySelector('.cart-quantity');
            quantityElement.value = item.quantity;
        });
    }

    var cartTotal = localStorage.getItem('cartTotal');
    if (cartTotal) {
        document.querySelector('.total-price').innerText = "₵" + cartTotal;
    }
}

// Function to update cart icon with quantity
function updateCartIcon() {
    var cartBoxes = document.querySelectorAll('.cart-box');
    var quantity = 0;
    cartBoxes.forEach(cartBox => {
        var quantityElement = cartBox.querySelector('.cart-quantity');
        if (quantityElement) { // Check if quantityElement is not null
            quantity += parseInt(quantityElement.value);
        }
    });

    var cartIcon = document.querySelector('#cart-icon');
    cartIcon.setAttribute('data-quantity', quantity);
}
