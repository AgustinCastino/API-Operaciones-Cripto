import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config(); 

export function authMiddleware(req, res, next) {

    const token = req.headers['authorization'];
    req.session = {user:null}

    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    try{
        const data = jwt.verify(token, process.env.SECRET_JWT_KEY)
        console.log(data);
        req.session.user = data
    }finally{
        next()
    }

}