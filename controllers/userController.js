import { userService } from '../services/userService.js'
import { AuthError, RegisterError } from "../Errors/userErros.js"
import { DbError } from '../Errors/dbErrors.js'

export class userController {
    static async login(req, res) {

        const user = req.body

        try{
            const userResponse = await userService.loginUser(user)
            return res.status(200).json(userResponse);

        }catch(e){
            return userController.handleError(res,e)
        }

    }

    static async register(req, res) {
        let newUser = req.body

        try{
            newUser = await userService.newUser(newUser)
            return res.status(200).json(newUser);

        }catch(e){
            return userController.handleError(res,e)
        }

    }

    static handleError(res, error) {
        console.log('Entra en handleError');

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


}