import z from 'zod'

const criptoSchema = z.object({
  name: z.string(),
  shortname: z.string().toUpperCase(),
  price: z.number().positive(),
  lastUpdate: z.date()
})

// El input debe tener todos los campos y esta función valida todos los campos del schema
export function validarCripto (input) {
  return criptoSchema.safeParse(input)
}

// Valida solo los campos que le llegan en el input. Por eso es parcial. No hacen falta todos los campos
export function validarCriptoParcial (input) {
  return criptoSchema.partial().safeParse(input)
}