import { Topic } from "../model"

class TopicService {
    async getTopics() {
        const topics = Topic.find()
            .populate({
                path: 'lastPost',
                select: 'title creationDate _id'
            })
            .exec().then((topics) => {
                return topics
            }).catch((err) => {
                console.error(err)
                return null
            })
        return topics
    }

    async getTopic(id: string) {
        const topic = Topic.findById(id)
            .populate({
                path: 'lastPost',
                select: 'title creationDate _id'
            })
            .exec().then((topic) => {
                return topic
            }).catch((err) => {
                console.error(err)
                return null
            })
        return topic
    }
}

export { TopicService }