import { Conversation, Message } from '../model'
import { sendWSMessage } from '../server/createWSserver'

class ConversationService {
    async getConversation(userId: string, interlocutorId: string) {
        try {
            const conversation = await Conversation.findOne({
                members: { $all: [userId, interlocutorId] },
            })
                .populate({
                    path: 'messages',
                    populate: {
                        path: 'sender',
                        select: 'username _id',
                    },
                })
                .populate({
                    path: 'members',
                    select: 'username profilePicture _id',
                })
            if (conversation) {
                return { code: 200, data: conversation }
            } else {
                return { code: 404, error: 'Conversation not found' }
            }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }

    async getConversations(userId: string) {
        try {
            const conversations = await Conversation.find({
                members: { $in: [userId] },
            })
                .populate({
                    path: 'members',
                    select: 'username profilePicture _id',
                })
                .populate({
                    path: 'lastMessage',
                    populate: {
                        path: 'sender',
                        select: 'username _id',
                    },
                })
                .sort({ 'lastMessage.date': -1 })
            return { code: 200, data: conversations }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }

    async sendMessage(userId: string, interlocutorId: string, content: string) {
        try {
            const message = await new Message({
                content,
                sender: userId,
                date: new Date(),
                isRead: false,
            }).save()

            const conversation = await Conversation.findOne({
                members: { $all: [userId, interlocutorId] },
            })

            if (conversation) {
                conversation.messages.push(message._id)
                conversation.lastMessage = message._id
                await conversation.save()
                sendWSMessage(interlocutorId, {
                    action: 'newMessage',
                    data: {
                        conversationId: conversation._id,
                        message,
                    },
                })
                return { code: 200, data: message }
            } else {
                const newConversation = await new Conversation({
                    members: [userId, interlocutorId],
                    messages: [message._id],
                    lastMessage: message._id,
                }).save()
                sendWSMessage(interlocutorId, {
                    action: 'newMessage',
                    data: {
                        conversationId: newConversation._id,
                        message: await message.populate('sender', 'username _id'),
                    },
                })
                return { code: 200, data: message }
            }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }

    async markAsRead(userId: string, conversationId: string) {
        try {
            const conversation = await Conversation.findOne({
                _id: conversationId,
                members: { $in: [userId] },
            })
            if (conversation) {
                // mark only the messages that are not already read
                // mark only the messages from non-current user
                await Message.updateMany(
                    {
                        _id: { $in: conversation.messages },
                        sender: { $ne: userId },
                        isRead: false,
                    },
                    { $set: { isRead: true } }
                )
                const interlocutorId = conversation.members.find((member) => member.toString() !== userId)
                if (interlocutorId) {
                    sendWSMessage(interlocutorId.toString(), {
                        action: 'markAsRead',
                        data: {
                            conversationId,
                        },
                    })
                }
                return { code: 200, data: 'Messages marked as read' }
            } else {
                return { code: 404, error: 'Conversation not found' }
            }
        } catch (err) {
            console.error(err)
            return { code: 500, error: 'Internal Server Error' }
        }
    }
}

export { ConversationService }
