const session = StorageManager.getSession('currentSession');

if (!session) {
    window.location.href = 'login.html';
}

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

function openNewTab() {
    window.open('dashboard.html', '_blank');
}

function updateClock() {
    document.getElementById('footer-time').textContent = new Date().toLocaleString('ro-RO');
}

// Init
applyTheme();

if (session) {
    document.getElementById('welcome-name').textContent = session.username;
    document.getElementById('sess-id').textContent = session.sessionId;
    document.getElementById('sess-username').textContent = session.username;
    document.getElementById('sess-email').textContent = session.email;

    const loginDate = new Date(session.loginTime);
    document.getElementById('sess-login-time').textContent = loginDate.toLocaleString('ro-RO');

    function updateDuration() {
        const diff = Math.floor((Date.now() - loginDate.getTime()) / 1000);
        const h = String(Math.floor(diff / 3600)).padStart(2, '0');
        const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
        const s = String(diff % 60).padStart(2, '0');
        document.getElementById('sess-duration').textContent = `${h}:${m}:${s}`;
    }

    updateDuration();
    setInterval(updateDuration, 1000);

    document.getElementById('raw-session').textContent =
        JSON.stringify(StorageManager.getAllSession(), null, 2);
}

setInterval(updateClock, 1000);
updateClock();
