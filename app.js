import express, { json } from 'express' // ES Modules
import dotenv from 'dotenv';
import { criptoRouter } from './routes/criptoRouter.js'
import { tradeRouter } from './routes/tradeRouter.js'
import { userRouter } from './routes/userRouter.js'
import cors from 'cors';

dotenv.config(); 

const app = express()

// MiddleWare para juntar los datos de la req
app.use(json()) // MiddleWare
app.use(cors()); // Middleware

// Desactiva info de la cabecera
app.disable('x-powered-by') 

app.use('/crypto', criptoRouter)
app.use('/trades', tradeRouter)
app.use('/users', userRouter)

const PORT = process.env.PORT ?? 8080

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})


