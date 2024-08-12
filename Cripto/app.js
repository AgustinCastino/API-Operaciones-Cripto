import express, { json } from 'express' // ES Modules
import { criptoRouter } from './routes/criptoRouter.js'
 
const app = express()
// MiddleWare para juntar los datos de la req
app.use(json()) // MiddleWare

// Desactiva info de la cabecera
app.disable('x-powered-by') 

app.use('/criptos', criptoRouter)

const PORT = process.env.PORT ?? 8080

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})


