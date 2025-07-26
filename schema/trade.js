import z from 'zod'

const operacionSchema = z.object({
  user_id: z.number().positive().int(),
  crypto_id: z.number().positive().int(), 
  trade_type: z.string(z.enum(['BUY','SELL'])),
  crypto_amount: z.number().positive(),
  usdt_amount: z.number().positive(),
  unit_price: z.number().positive()
})

// El input debe tener todos los campos y esta función valida todos los campos del schema
export function validarTrade (input) {
  return operacionSchema.safeParse(input)
}

// Valida solo los campos que le llegan en el input. Por eso es parcial. No hacen falta todos los campos
export function validarTradeParcial (input) {
  return operacionSchema.partial().safeParse(input)
}