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

function showFieldErr(id, msg) {
    const el = document.getElementById(id);
    el.textContent = msg;
    el.style.display = msg ? 'block' : 'none';
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function handleRegister(e) {
    e.preventDefault();
    let valid = true;

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;

    showFieldErr('err-username', '');
    showFieldErr('err-email', '');
    showFieldErr('err-password', '');

    if (username.length < 3) {
        showFieldErr('err-username', 'Username-ul trebuie să aibă minim 3 caractere.');
        valid = false;
    }

    if (!validateEmail(email)) {
        showFieldErr('err-email', 'Adresă email invalidă.');
        valid = false;
    }

    if (password.length < 6) {
        showFieldErr('err-password', 'Parola trebuie să aibă minim 6 caractere.');
        valid = false;
    } else if (password !== password2) {
        showFieldErr('err-password', 'Parolele nu coincid!');
        valid = false;
    }

    if (!valid) return;

    const DEFAULT_USERS = [
        { id: 1, username: 'admin', password: 'password', email: 'admin@example.com' },
        { id: 2, username: 'student', password: 'student123', email: 'student@example.com' }
    ];

    const users = StorageManager.getLocal('users') || DEFAULT_USERS;

    if (users.find(u => u.username === username)) {
        showFieldErr('err-username', 'Acest username este deja folosit.');
        return;
    }

    if (users.find(u => u.email === email)) {
        showFieldErr('err-email', 'Această adresă de email este deja înregistrată.');
        return;
    }

    const newUser = {
        id: users.length + 1,
        username,
        password,
        email
    };
    users.push(newUser);
    StorageManager.setLocal('users', users);

    showAlert(`✅ Cont creat cu succes pentru "${username}"! Redirecționare...`, 'success');
    setTimeout(() => { window.location.href = 'login.html'; }, 1500);
}

// Init
applyTheme();
