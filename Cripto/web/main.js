const form = document.getElementById('operacionForm');
const resultDiv = document.getElementById('result');

async function main(){
    fetch('http://localhost:8080/criptos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector('tbody');
        
        tbody.innerHTML = ''; 

        data.forEach(operacion => {
            console.log(operacion);
            
            const newLine = document.createElement('tr')
            
            const nombre = document.createElement('td');
            nombre.textContent = operacion.cripto; 
            newLine.appendChild(nombre);

            const tipoOperacion = document.createElement('td');
            tipoOperacion.textContent = operacion.tipo_operacion; 
            newLine.appendChild(tipoOperacion);

            const precioUsdt = document.createElement('td');
            precioUsdt.textContent = operacion.precio_usdt; 
            newLine.appendChild(precioUsdt);

            const cantidadUsdt = document.createElement('td');
            cantidadUsdt.textContent = operacion.cantidad_usdt
            newLine.appendChild(cantidadUsdt);

            const cantidadCripto = document.createElement('td');
            cantidadCripto.textContent = operacion.cantidad_cripto
            newLine.appendChild(cantidadCripto);

            const fechaOperacion = document.createElement('td');
            fechaOperacion.textContent = operacion.fecha
            newLine.appendChild(fechaOperacion);
        
            tbody.appendChild(newLine)
            
        });
    })
    .catch(error => {
        console.error('Error en la solicitud:', error); 
    });
}

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
    .then(main())
    .catch(err => console.log(err))

});

main()
