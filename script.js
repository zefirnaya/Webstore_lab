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
        name: "DIMOO Earth Day Figure",
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

document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    
    const cartInfo = document.querySelector('.cart-info');
    cartInfo.style.cursor = 'pointer';
    cartInfo.addEventListener('click', () => {
        cartSidebar.classList.add('active');
    });
});