document.addEventListener('DOMContentLoaded', function () {
    const username = localStorage.getItem('loggedInUser');
    if (!username) {
        alert('Por favor, inicie sesión primero.');
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('username').innerText = username;

    const getBtcPrice = async () => {
        try {
            const response = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
            const price = parseFloat(response.data.price);
            document.getElementById('btc-price').innerText = `$${price.toFixed(2)}`;
        } catch (error) {
            console.error('Error al obtener el precio:', error);
            document.getElementById('btc-price').innerText = 'Error al cargar el precio';
        }
    };

    getBtcPrice();

    document.getElementById('logoutButton').addEventListener('click', function () {
        localStorage.removeItem('loggedInUser');
        window.location.href = 'login.html';
    });

    const tradeForm = document.getElementById('tradeForm');
    const openTradesTable = document.querySelector('#openTradesTable tbody');

    tradeForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const tradeType = document.getElementById('tradeType').value;
        const entryPrice = parseFloat(document.getElementById('entryPrice').value);
        const volume = parseFloat(document.getElementById('volume').value);

        if (isNaN(entryPrice) || isNaN(volume)) {
            alert('Por favor, ingresa valores válidos');
            return;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${tradeType === 'buy' ? 'Compra' : 'Venta'}</td>
            <td>${entryPrice.toFixed(2)}</td>
            <td>${volume.toFixed(2)}</td>
            <td><button class="close-trade">Cerrar</button></td>
        `;

        row.querySelector('.close-trade').addEventListener('click', function () {
            const closePrice = prompt('Introduce el precio de cierre:');
            if (closePrice && !isNaN(parseFloat(closePrice))) {
                const profit =
                    tradeType === 'buy'
                        ? (parseFloat(closePrice) - entryPrice) * volume
                        : (entryPrice - parseFloat(closePrice)) * volume;

                alert(`Operación cerrada con ${profit >= 0 ? 'ganancia' : 'pérdida'}: ${profit.toFixed(2)}`);
                row.remove();
            } else {
                alert('Precio de cierre no válido.');
            }
        });

        openTradesTable.appendChild(row);
        tradeForm.reset();
    });
});
