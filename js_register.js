document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (localStorage.getItem(username)) {
            alert('El usuario ya existe. Por favor elige otro nombre.');
        } else {
            const user = {
                username,
                password
            };
            localStorage.setItem(username, JSON.stringify(user));

            alert('Usuario registrado exitosamente');
            window.location.href = 'login.html';
        }
    });
});
