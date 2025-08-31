import { validateNewUser, validateUserLogIn } from "../schema/userSchema.js"
import { AuthError, RegisterError } from "../Errors/userErros.js"
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export class userService {
    static async newUser(newUser) {

        const validatedNewUser = validateNewUser(newUser)
        if (!validatedNewUser.success) {
            throw new RegisterError(validatedNewUser.error.message);
        }

        const user = await prisma.users.findFirst({
            where:{
                OR:[
                    {user_name: newUser.username},
                    {email: newUser.email}
                ]
            }
        })

        if (user){
            if(newUser.username == user.user_name){
                throw new RegisterError("Username no disponible");
            }else{
                throw new RegisterError("Email no disponible");
            }
        }

        const hashedPassword = bcrypt.hashSync(newUser.password, 10)

        const userCreated = await prisma.users.create({
            data:{
                name: newUser.name,
                surname:newUser.surname,
                user_name: newUser.username,
                email: newUser.email,
                password: hashedPassword
            }
        })

        return (
            {   name: newUser.name,
                email: newUser.email,
                username: newUser.username
            }
        )
    }

    static async loginUser({ username, password }) {
        const user = await prisma.users.findFirst({
            where:{
                user_name: username
            }
        })
        if (!user) {
            throw new AuthError("Credenciales Incorrectas");
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) throw new AuthError("Credenciales Incorrectas");

        const token = jwt.sign(
            { username, password },
            process.env.SECRET_JWT_KEY,
            { expiresIn: '1h' }
        )

        const userReponse = {
            username: user.user_name,
            token
        }

        return userReponse
    }


}