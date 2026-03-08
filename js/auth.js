import { validateName } from './validation.js';

const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Hardcoded credentials
    const users = [
        { user: 'admin', pass: 'admin123', role: 'admin' },
        { user: 'attendant', pass: 'park2026', role: 'attendant' }
    ];

    const user = users.find(u => u.user === username && u.pass === password);

    if (user) {
        errorMsg.innerText = '';
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userRole', user.role);

        if (user.role === 'admin') window.location.href = 'reports.html';
        else window.location.href = 'dashboard.html';
    } else {
        errorMsg.innerText = 'Invalid username or password!';
    }
});