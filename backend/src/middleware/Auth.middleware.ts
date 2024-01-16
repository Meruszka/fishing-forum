import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface RequestWithUser extends Request {
    user?: JWTUser
}

interface JWTUser {
    _id: string
    iat: number
}

function verifyToken(token: string): JWTUser {
    const secret = process.env.JWT_SECRET || ''
    return jwt.verify(token, secret) as JWTUser
}

const verifyTokenMiddleware = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']
    if (!token) return res.status(401).json({ error: 'Access Denied: No Token Provided!' })

    try {
        const verified = verifyToken(token)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).json({ error: 'Invalid Token' })
    }
}

export { verifyTokenMiddleware, verifyToken }
export type { RequestWithUser }
