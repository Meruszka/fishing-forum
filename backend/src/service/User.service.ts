import User from '../model/User.model'

class UserService {
    async getUser(id: string) {
        const user = User.findById(id)
            .populate({
                path: 'posts',
                select: 'title creationDate _id'
            })
            .populate({
                path: 'badges',
                select: 'name icon'
            })
            .populate({
                path: 'gear',
                select: 'name kind _id'
            })
            .populate({
                path: 'friends',
                populate: { 
                path: 'friend', 
                select: 'username _id' 
                }
            })
            .exec().then((user) => {
            // map _id to id
            // do not return password
            if (user) {
                const { _id, password, ...userWithoutPassword } = user.toObject()
                return { id: _id, ...userWithoutPassword }
            } else {
                return null
            }
        }).catch((err) => {
            console.error(err)
            return null
        })
        return user
    }

    async updateUser(id: string, user: any) {
        User.findByIdAndUpdate(id, user)
        const updatedUser = User.findById(id)
        return updatedUser
    }

    async deleteUser(id: string) {
        const deletedUser = User.findByIdAndDelete(id)
        return deletedUser
    }
}

export { UserService }
