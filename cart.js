const session = StorageManager.getSession('currentSession');

if (!session) {
    window.location.href = 'login.html';
}

const PRODUCTS = {
    laptop:  { name: 'Laptop',  price: 2500 },
    telefon: { name: 'Telefon', price: 1200 },
    tableta: { name: 'Tabletă', price: 800 },
    casti:   { name: 'Căști',   price: 150 }
};

const ICONS = { laptop: '💻', telefon: '📱', tableta: '📟', casti: '🎧' };

function applyTheme() {
    document.body.className = CookieManager.get('theme') || 'light';
}

function toggleTheme() {
    const next = (CookieManager.get('theme') || 'light') === 'light' ? 'dark' : 'light';
    CookieManager.set('theme', next, 365);
    document.body.className = next;
}

function logout() {
    StorageManager.clearSession();
    window.location.href = 'login.html';
}

function getCart() {
    return StorageManager.getSession('cart') || {};
}

function saveCart(cart) {
    StorageManager.setSession('cart', cart);
}

function addToCart(e) {
    e.preventDefault();
    const key = document.getElementById('product').value;
    const qty = parseInt(document.getElementById('qty').value) || 1;
    const cart = getCart();
    cart[key] = (cart[key] || 0) + Math.min(qty, 10);
    saveCart(cart);
    renderCart();
}

function removeFromCart(key) {
    const cart = getCart();
    delete cart[key];
    saveCart(cart);
    renderCart();
}

function clearCart() {
    if (!confirm('Golești coșul?')) return;
    saveCart({});
    renderCart();
}

function formatRON(n) {
    return n.toLocaleString('ro-RO') + ' RON';
}

function renderCart() {
    const cart = getCart();
    const tbody = document.getElementById('cart-tbody');
    const keys = Object.keys(cart).filter(k => cart[k] > 0);

    document.getElementById('item-count').textContent = keys.length;

    if (keys.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="5">Coșul este gol 🛒</td></tr>';
        document.getElementById('cart-total').textContent = '0 RON';
        return;
    }

    let total = 0;
    tbody.innerHTML = keys.map(key => {
        const prod = PRODUCTS[key];
        const qty = cart[key];
        const subtotal = prod.price * qty;
        total += subtotal;
        return `<tr>
            <td>${ICONS[key]} ${prod.name}</td>
            <td>× ${qty}</td>
            <td>${formatRON(prod.price)}</td>
            <td><strong>${formatRON(subtotal)}</strong></td>
            <td><button class="btn btn-danger btn-sm" onclick="removeFromCart('${key}')">✕</button></td>
        </tr>`;
    }).join('');

    document.getElementById('cart-total').textContent = formatRON(total);
}

// Init
applyTheme();

if (session) {
    document.getElementById('logged-user').textContent = session.username;
}

renderCart();
