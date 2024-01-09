import User from '../model/User.model'

class UserService {
    async getUser(id: string) {
        const user = User.findById(id).then((user) => {
            return user
        }).catch((err) => {
            console.error(err)
            return null
        })
        return user
    }

    async createUser(user: any) {
        const newUser = await User.create(user)
        return newUser
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
