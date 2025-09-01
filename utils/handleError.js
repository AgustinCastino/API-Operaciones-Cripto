import { AuthError, RegisterError } from "../Errors/userErros.js"
import { DbError } from "../Errors/dbErrors.js"

export function handleError(res, error) {
    if (error instanceof AuthError) {
        return res.status(400).json({ error: error.message })
    }

    if (error instanceof RegisterError) {
        return res.status(409).json({ error: error.message })
    }

    if (error instanceof DbError) {
        return res.status(500).json({ error: error.message })
    }

    console.error('Error inesperado:', error)
    return res.status(500).json({ error: 'Error interno del servidor' })
}