import z from 'zod'

const userRegisterSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es obligatorio' }),
  surname: z.string().min(1, { message: 'El apellido es obligatorio' }),
  username: z.string().min(1, { message: 'El nombre de usuario es obligatorio' }),
  email: z.string().email({ message: 'El email no es válido' }),
  password: z.string().min(7, { message: 'La contraseña debe tener más de 6 caracteres' }),
});

// El input debe tener todos los campos y esta función valida todos los campos del schema
export function validateNewUser (input) {
  return userRegisterSchema.safeParse(input)
}

// Valida solo los campos que le llegan en el input. Por eso es parcial. No hacen falta todos los campos
export function validateUserLogIn (input) {
  return userRegisterSchema.partial().safeParse(input)
}