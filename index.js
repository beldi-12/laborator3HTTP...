function applyTheme() {
    const theme = CookieManager.get('theme') || 'light';
    document.body.className = theme;
}

function toggleTheme() {
    const current = CookieManager.get('theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    CookieManager.set('theme', next, 365);
    document.body.className = next;
}

function trackVisit() {
    let visits = parseInt(CookieManager.get('visits') || '0') + 1;
    CookieManager.set('visits', visits, 365);
    return visits;
}

function escHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function renderCookies() {
    const cookies = CookieManager.getAll();
    const tbody = document.getElementById('cookies-tbody');
    const keys = Object.keys(cookies);
    document.getElementById('cookie-count').textContent = keys.length;

    if (keys.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="4">Niciun cookie activ</td></tr>';
        return;
    }

    tbody.innerHTML = keys.map(name => `
        <tr>
            <td><span class="badge badge-purple">${escHtml(name)}</span></td>
            <td>${escHtml(cookies[name])}</td>
            <td>${cookies[name].length} ch.</td>
            <td><button class="btn btn-danger btn-sm" onclick="deleteCookie('${escHtml(name)}')">✕ Șterge</button></td>
        </tr>
    `).join('');
}

function renderLocal() {
    const data = StorageManager.getAllLocal();
    const tbody = document.getElementById('local-tbody');
    const keys = Object.keys(data);
    document.getElementById('local-count').textContent = keys.length;

    if (keys.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="3">Nicio intrare în localStorage</td></tr>';
        return;
    }

    tbody.innerHTML = keys.map(k => {
        const val = JSON.stringify(data[k]);
        return `<tr>
            <td><span class="badge badge-green">${escHtml(k)}</span></td>
            <td>${escHtml(val.substring(0, 80))}${val.length > 80 ? '…' : ''}</td>
            <td>${val.length} ch.</td>
        </tr>`;
    }).join('');
}

function renderSession() {
    const data = StorageManager.getAllSession();
    const tbody = document.getElementById('session-tbody');
    const keys = Object.keys(data);
    document.getElementById('session-count').textContent = keys.length;

    if (keys.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="3">Nicio intrare în sessionStorage</td></tr>';
        return;
    }

    tbody.innerHTML = keys.map(k => {
        const val = JSON.stringify(data[k]);
        return `<tr>
            <td><span class="badge badge-red">${escHtml(k)}</span></td>
            <td>${escHtml(val.substring(0, 80))}${val.length > 80 ? '…' : ''}</td>
            <td>${val.length} ch.</td>
        </tr>`;
    }).join('');
}

function deleteCookie(name) {
    CookieManager.delete(name);
    renderAll();
}

function deleteAll() {
    if (!confirm('Ștergi toate cookie-urile și datele din storage?')) return;
    CookieManager.deleteAll();
    StorageManager.clearLocal();
    StorageManager.clearSession();
    renderAll();
    document.getElementById('username-display').textContent = 'Vizitator';
    document.getElementById('visit-message').textContent = 'Toate datele au fost șterse.';
    document.getElementById('visit-count').textContent = '0';
}

function renderAll() {
    renderCookies();
    renderLocal();
    renderSession();
}

function updateClock() {
    document.getElementById('footer-time').textContent = new Date().toLocaleString('ro-RO');
}

// Init
applyTheme();
const visits = trackVisit();
const username = CookieManager.get('username') || 'Vizitator';
document.getElementById('username-display').textContent = username;
document.getElementById('visit-count').textContent = visits;
document.getElementById('visit-message').textContent =
    visits === 1
        ? 'Prima ta vizită pe această pagină! 🎉'
        : `Aceasta este vizita ta numărul ${visits} pe această pagină.`;

updateClock();
setInterval(updateClock, 1000);
renderAll();
