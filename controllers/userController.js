import { userService } from '../services/userService.js'
import { handleError } from '../utils/handleError.js'

export class userController {
    static async login(req, res) {

        const user = req.body

        try{
            const userResponse = await userService.loginUser(user)
            return res.status(200).json(userResponse);

        }catch(e){
            return handleError(res,e)
        }

    }

    static async register(req, res) {
        let newUser = req.body

        try{
            newUser = await userService.newUser(newUser)
            return res.status(200).json(newUser);

        }catch(e){
            return handleError(res,e)
        }

    }


}