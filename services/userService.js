import { userModel } from '../models/userModel.js'
import { validateNewUser, validateUserLogIn } from "../schema/userSchema.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config(); 


export class userService {

    static async newUser(newUser) {
        let user
        let res
        const validatedNewUser = validateNewUser(newUser)
        if (!validatedNewUser.success) {
            return { success: false, error: JSON.parse(validatedNewUser.error.message) }
        }


        res = await userModel.getUserByEmail(newUser.email)
        user = res[0]
        if (user.length > 0) {
            throw new Error("Email no disponible");
        }


        res = await userModel.getUserByUsername(newUser.username)
        user = res[0]
        if (user.length > 0) {
            throw new Error("Username no disponible");
        }

        const hashedPassword = bcrypt.hashSync(newUser.password, 10)

        newUser.password = hashedPassword

        try {
            await userModel.newUser(newUser)
            return { success: true, data: 'Usuario creado con éxito' };
        } catch (error) {
            return { success: false, error };
        }
    }

    static async loginUser({ username, password }) {
        const res = await userModel.getUserByUsername(username)
        let user = res[0]
        if (user.length == 0) {
            throw new Error("Username incorrecto o inexistente");
        }

        user = user[0]

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) throw new Error("Invalid Password");
        const token = jwt.sign(
            { username, password },
            process.env.SECRET_JWT_KEY,
            { expiresIn: '1h' }
        )

        const userReponse = {
            username: user.user_name,
            token
        }

        return { success: true, data: userReponse }


    }


}