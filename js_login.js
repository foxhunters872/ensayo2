document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        const storedUser = localStorage.getItem(username);
        if (storedUser && JSON.parse(storedUser).password === password) {
            localStorage.setItem('loggedInUser', username);
            alert('Login exitoso');
            window.location.href = 'index.html';
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });
});
