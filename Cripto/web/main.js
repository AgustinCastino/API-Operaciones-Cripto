const form = document.getElementById('operacionForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const tipoOperacion = document.getElementById('tipoOperacion').value;
    const cripto = document.getElementById('cripto').value;
    const precioUSDT = document.getElementById('precioUSDT').value;
    const cantidadCripto = document.getElementById('cantidadCripto').value;
    const cantidadUSDT = document.getElementById('cantidadUSDT').value;
    const fecha = document.getElementById('fecha').value;

    const data = {
        tipo_operacion: tipoOperacion,
        cripto: cripto,
        precio_usdt: Number(precioUSDT),
        cantidad_cripto: Number(cantidadCripto),
        cantidad_usdt: Number(cantidadUSDT),
        fecha: fecha
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch('http://localhost:8080/criptos', options)
    .then(data => data.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))

});


