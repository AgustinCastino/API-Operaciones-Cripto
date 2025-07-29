import { userService } from '../services/userService.js'

export class userController {
    static async login(req, res) {

        const user = req.body

        const result = await userService.loginUser(user)

        if (result.success) {
            return res.status(200).json(result.data);
        } else {
            return res.status(401).json({ error: result.error });
        }

    }

    static async register(req, res) {
        const newUser = req.body

        const result = await userService.newUser(newUser)

        if (result.success) {
            return res.status(200).json(result.data);
        } else {
            return res.status(400).json({ error: result.error });
        }

    }


}