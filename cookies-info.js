function applyTheme() {
    document.body.className = CookieManager.get('theme') || 'light';
}

function toggleTheme() {
    const next = (CookieManager.get('theme') || 'light') === 'light' ? 'dark' : 'light';
    CookieManager.set('theme', next, 365);
    document.body.className = next;
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
    document.getElementById('raw-cookies').textContent = document.cookie || '(gol)';
    const tbody = document.getElementById('cookies-tbody');
    const keys = Object.keys(cookies);

    if (keys.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="4">Niciun cookie</td></tr>';
        return;
    }

    tbody.innerHTML = keys.map(name => `
        <tr>
            <td><span class="badge badge-purple">${escHtml(name)}</span></td>
            <td>${escHtml(cookies[name])}</td>
            <td>${cookies[name].length} ch.</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeCookie('${escHtml(name)}')">✕</button></td>
        </tr>
    `).join('');
}

function renderLocal() {
    const data = StorageManager.getAllLocal();
    const json = JSON.stringify(data, null, 2);
    document.getElementById('raw-local').textContent = json || '{}';
    const tbody = document.getElementById('local-tbody');
    const keys = Object.keys(data);

    if (keys.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="4">localStorage gol</td></tr>';
        return;
    }

    tbody.innerHTML = keys.map(k => {
        const val = JSON.stringify(data[k]);
        return `<tr>
            <td><span class="badge badge-green">${escHtml(k)}</span></td>
            <td>${escHtml(val.substring(0, 70))}${val.length > 70 ? '…' : ''}</td>
            <td>${val.length} ch.</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeLocal('${escHtml(k)}')">✕</button></td>
        </tr>`;
    }).join('');
}

function renderSession() {
    const data = StorageManager.getAllSession();
    const json = JSON.stringify(data, null, 2);
    document.getElementById('raw-session').textContent = json || '{}';
    const tbody = document.getElementById('session-tbody');
    const keys = Object.keys(data);

    if (keys.length === 0) {
        tbody.innerHTML = '<tr class="empty-row"><td colspan="4">sessionStorage gol</td></tr>';
        return;
    }

    tbody.innerHTML = keys.map(k => {
        const val = JSON.stringify(data[k]);
        return `<tr>
            <td><span class="badge badge-red">${escHtml(k)}</span></td>
            <td>${escHtml(val.substring(0, 70))}${val.length > 70 ? '…' : ''}</td>
            <td>${val.length} ch.</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeSession('${escHtml(k)}')">✕</button></td>
        </tr>`;
    }).join('');
}

function removeCookie(name) { CookieManager.delete(name); renderAll(); }
function removeLocal(key) { StorageManager.removeLocal(key); renderAll(); }
function removeSession(key) { StorageManager.removeSession(key); renderAll(); }

function renderAll() {
    renderCookies();
    renderLocal();
    renderSession();
}

// Init
applyTheme();
renderAll();
