import { Topic } from '../model'

class TopicService {
    async getTopics() {
        try {
            const topics = await Topic.find().populate({
                path: 'lastPost',
                select: 'title creationDate _id',
            })

            return { code: 200, data: topics }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }

    async getTopic(id: string) {
        try {
            const topic = await Topic.findById(id).populate({
                path: 'lastPost',
                select: 'title creationDate _id',
            })

            if (!topic) {
                return { code: 404, error: 'Topic not found' }
            }

            return { code: 200, data: topic }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }
}

export { TopicService }
