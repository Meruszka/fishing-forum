import { Topic } from '../model'

class TopicService {
    async getTopics() {
        try {
            const topics = await Topic.find()
                .populate({
                    path: 'lastPost',
                    select: 'title creationDate _id',
                });

            return topics;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    async getTopic(id: string) {
        try {
            const topic = await Topic.findById(id)
                .populate({
                    path: 'lastPost',
                    select: 'title creationDate _id',
                });

            if (!topic) throw new Error("Topic not found");

            return topic;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}

export { TopicService }
