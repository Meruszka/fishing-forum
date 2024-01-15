import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface RequestWithUser extends Request {
    user?: JWTUser
}

interface JWTUser {
    _id: string
    iat: number
}

const verifyToken = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']
    if (!token) return res.status(401).json({ error: 'Access Denied: No Token Provided!' })

    try {
        const secret = process.env.JWT_SECRET || ''
        const verified = jwt.verify(token, secret) as JWTUser
        req.user = verified
        next()
    } catch (error) {
        res.status(400).json({ error: 'Invalid Token' })
    }
}

export { verifyToken }
export type { RequestWithUser }
