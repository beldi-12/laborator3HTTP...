function applyTheme() {
    document.body.className = CookieManager.get('theme') || 'light';
}

function toggleTheme() {
    const current = CookieManager.get('theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    CookieManager.set('theme', next, 365);
    document.body.className = next;
    document.getElementById('theme').value = next;
}

function loadPrefs() {
    const username = CookieManager.get('username') || '';
    const theme = CookieManager.get('theme') || 'light';
    const language = StorageManager.getLocal('language') || 'ro';
    const fontsize = StorageManager.getLocal('fontsize') || '16';

    document.getElementById('username').value = username;
    document.getElementById('theme').value = theme;
    document.getElementById('language').value = language;
    document.getElementById('fontsize').value = fontsize;

    document.body.style.fontSize = fontsize + 'px';
}

function savePrefs(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim() || 'Vizitator';
    const theme = document.getElementById('theme').value;
    const language = document.getElementById('language').value;
    const fontsize = document.getElementById('fontsize').value;

    CookieManager.set('username', username, 365);
    CookieManager.set('theme', theme, 365);
    StorageManager.setLocal('language', language);
    StorageManager.setLocal('fontsize', fontsize);

    document.body.className = theme;
    document.body.style.fontSize = fontsize + 'px';

    const alertBox = document.getElementById('alert-box');
    alertBox.className = 'alert alert-success show';
    alertBox.textContent = '✅ Preferințele au fost salvate cu succes!';

    setTimeout(() => { window.location.href = 'index.html'; }, 1500);
}

// Init
applyTheme();
loadPrefs();
