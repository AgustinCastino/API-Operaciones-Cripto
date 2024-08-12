import z from 'zod'

const operacionSchema = z.object({
  tipo_operacion: z.string(z.enum(['compra','venta'])),
  cripto: z.string(),
  precio_usdt: z.number().positive(),
  cantidad_cripto: z.number().positive(),
  cantidad_usdt: z.number().positive(),
  fecha: z.string().date()
})

// El input debe tener todos los campos y esta función valida todos los campos del schema
export function validarOperacion (input) {
  return operacionSchema.safeParse(input)
}

// Valida solo los campos que le llegan en el input. Por eso es parcial. No hacen falta todos los campos
export function validarOperacionParcial (input) {
  return operacionSchema.partial().safeParse(input)
}