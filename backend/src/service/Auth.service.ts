import User from '../model/User.model'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

class AuthService {
    async login(username: string, password: string): Promise<string> {
        // Check if user exists
        const currentUser = await User.findOne({ username })
        if (currentUser === null) throw new Error('User not found')
        // Check if password is correct
        const currentUserPassword = currentUser.password
        if (currentUserPassword === undefined || currentUserPassword === null) throw new Error('Something went wrong')
        const result = bcrypt.compare(password, currentUserPassword).then((validPassword) => {
            if (!validPassword) throw new Error('Invalid password')
            // Return token
            const token = jwt.sign({ _id: currentUser._id }, process.env.JWT_SECRET || '')
            return token
        })
        return result
    }

    async register(username: string, password: string): Promise<string> {
        // Check if user exists
        const currentUser = await User.findOne({ username })
        if (currentUser !== null) throw new Error('User already exists')
        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // Create user
        const user = new User({
            username,
            password: hashedPassword,
            dateOfRegistration: new Date(),
            description: '',
            profilePicture: '',
            location: '',
            score: 0,
            rank: 'Newbie',
            posts: [],
            badges: [],
            gear: [],
            conversations: [],
            friends: [],
        })
        // Save user
        const savedUser = await user.save()
        // Return token
        try{
            const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET || '')
            return token
        } catch(err){
            throw new Error('Something went very wrong')
        }
    }
}

export { AuthService }