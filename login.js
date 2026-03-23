const DEFAULT_USERS = [
    { id: 1, username: 'admin', password: 'password', email: 'admin@example.com' },
    { id: 2, username: 'student', password: 'student123', email: 'student@example.com' }
];

function initUsers() {
    if (!StorageManager.getLocal('users')) {
        StorageManager.setLocal('users', DEFAULT_USERS);
    }
}

function applyTheme() {
    document.body.className = CookieManager.get('theme') || 'light';
}

function toggleTheme() {
    const next = (CookieManager.get('theme') || 'light') === 'light' ? 'dark' : 'light';
    CookieManager.set('theme', next, 365);
    document.body.className = next;
}

function showAlert(msg, type) {
    const el = document.getElementById('alert-box');
    el.textContent = msg;
    el.className = `alert alert-${type} show`;
}

function generateSessionId() {
    return 'sess_' + Math.random().toString(36).substring(2, 12).toUpperCase();
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    const users = StorageManager.getLocal('users') || DEFAULT_USERS;
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        showAlert('❌ Username sau parolă incorectă!', 'error');
        return;
    }

    if (remember) {
        StorageManager.setLocal('remembered_username', username);
    } else {
        StorageManager.removeLocal('remembered_username');
    }

    const session = {
        userId: user.id,
        username: user.username,
        email: user.email,
        loginTime: new Date().toISOString(),
        sessionId: generateSessionId()
    };

    StorageManager.setSession('currentSession', session);
    showAlert('✅ Autentificare reușită! Redirecționare...', 'success');
    setTimeout(() => { window.location.href = 'dashboard.html'; }, 1000);
}

function prefillRemembered() {
    const remembered = StorageManager.getLocal('remembered_username');
    if (remembered) {
        document.getElementById('username').value = remembered;
        document.getElementById('remember').checked = true;
    }
}

// Init
applyTheme();
initUsers();
prefillRemembered();

if (StorageManager.getSession('currentSession')) {
    window.location.href = 'dashboard.html';
}
