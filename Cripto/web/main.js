console.log('Funca');

fetch('http://localhost:8080/jugadores')
.then(resp => console.log(resp))
.catch(err => console.log(err))


      