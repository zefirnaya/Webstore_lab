let cartItems = [];

const products = [
    {
        id: 1,
        name: "SKULLPANDA The Warmth Series",
        price: 1800,
        image: "https://prod-eurasian-res.popmart.com/default/1_JXq4BcLoLv_1200x1200.jpg"
    },
    {
        id: 2,
        name: "DIMOO By Your Side Series Figures",
        price: 1700,
        image: "https://prod-eurasian-res.popmart.com/default/20240612_102058_963725____1_____1200x1200.jpg"
    },
    {
        id: 3,
        name: "GLEBOO Earth Day Figure",
        price: 3600,
        image: "https://prod-eurasian-res.popmart.com/default/20250415_155736_903426____1_____1200x1200.jpg"
    },
    {
        id: 4,
        name: "Finding MOKOKO Series Figures",
        price: 1500,
        image: "https://prod-eurasian-res.popmart.com/default/20241126_175057_985778____1_____1200x1200.jpg"
    },
    {
        id: 5,
        name: "Hirono Shelter Series Figures",
        price: 1500,
        image: "https://prod-eurasian-res.popmart.com/default/20240715_143422_831856____1_____1200x1200.jpg"
    },
    {
        id: 6,
        name: "CHAKA Light Sprite Series Figures",
        price: 1400,
        image: "https://prod-eurasian-res.popmart.com/default/20240708_154454_015088____1_____1200x1200.jpg"
    }
];

const productsGrid = document.getElementById('products-grid');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const sidebarCartTotal = document.getElementById('sidebar-cart-total');
const closeCart = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const modalOverlay = document.getElementById('modal-overlay');
const orderForm = document.getElementById('order-form');
const cancelOrder = document.getElementById('cancel-order');

function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">${product.price.toLocaleString()} руб.</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Добавить в корзину
            </button>
        `;
        productsGrid.appendChild(productCard);
    });
}

function openCart() {
    cartSidebar.classList.add('active');
    renderCart();
}

function closeCartSidebar() {
    cartSidebar.classList.remove('active');
}

function openModal() {
    modalOverlay.classList.add('active');
}

function closeModal() {
    modalOverlay.classList.remove('active');
}

function renderCart() {
    cartItemsContainer.innerHTML = '';
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Корзина пуста</div>';
        return;
    }
    
    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${item.price.toLocaleString()} руб.</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Удалить</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
}

function updateCartTotal() {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    cartTotal.textContent = total.toLocaleString();
    cartCount.textContent = totalCount.toLocaleString();
    sidebarCartTotal.textContent = total.toLocaleString();
}

closeCart.addEventListener('click', closeCartSidebar);
checkoutBtn.addEventListener('click', openModal);
cancelOrder.addEventListener('click', closeModal);


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showAddToCartAnimation(productId);
}

function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    updateCart();
}

function increaseQuantity(productId) {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        updateCart();
    }
}

function decreaseQuantity(productId) {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeFromCart(productId);
            return;
        }
        updateCart();
    }
}

function updateCart() {
    renderCart();
    updateCartTotal();
}

function showAddToCartAnimation(productId) {
    const button = document.querySelector(`.add-to-cart[onclick="addToCart(${productId})"]`);
    if (button) {
        const originalText = button.textContent;
        button.textContent = 'Добавлено!';
        button.style.background = '#27ae60';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 1000);
    }
}

function renderCart() {
    cartItemsContainer.innerHTML = '';
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Корзина пуста</div>';
        checkoutBtn.disabled = true;
        checkoutBtn.style.background = '#95a5a6';
        return;
    }
    
    checkoutBtn.disabled = false;
    checkoutBtn.style.background = '#27ae60';
    
    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${item.price.toLocaleString()} руб.</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Удалить</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });
}

function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cartItems.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    saveCartToLocalStorage();
    showAddToCartAnimation(productId);
}

function removeFromCart(productId) {
    cartItems = cartItems.filter(item => item.id !== productId);
    updateCart();
    saveCartToLocalStorage();
}

function increaseQuantity(productId) {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        updateCart();
        saveCartToLocalStorage();
    }
}

function decreaseQuantity(productId) {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeFromCart(productId);
            return;
        }
        updateCart();
        saveCartToLocalStorage();
    }
}

function submitOrder(orderData) {
    console.log('Данные заказа:', orderData);
    console.log('Товары в заказе:', cartItems);
    
    alert('Заказ создан!');
    
    cartItems = [];
    updateCart();
    saveCartToLocalStorage();
    
    closeModal();
    
    closeCartSidebar();
}

orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(orderForm);
    const orderData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        address: formData.get('address'),
        phone: formData.get('phone'),
        orderDate: new Date().toISOString()
    };
    
    submitOrder(orderData);
});

document.getElementById('phone').addEventListener('input', function(e) {
    const phone = e.target.value.replace(/\D/g, '');
    e.target.value = phone;
});

checkoutBtn.addEventListener('click', function() {
    if (cartItems.length === 0) {
        alert('Корзина пуста!');
        return;
    }
    openModal();
});

document.addEventListener('DOMContentLoaded', function() {
    loadCartFromLocalStorage();
    renderProducts();
    updateCartTotal();
    
    const cartInfo = document.querySelector('.cart-info');
    cartInfo.style.cursor = 'pointer';
    cartInfo.addEventListener('click', openCart);
    
    document.addEventListener('click', (e) => {
        if (e.target === cartSidebar) {
            closeCartSidebar();
        }
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
});