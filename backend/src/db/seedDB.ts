import { Badge, FishingSpot, Friend, Gear, Post, Topic, User, Response } from '../model'
import bcrypt from 'bcryptjs'

async function seedDB() {
    // run only if there are no users in the database
    const users = await User.find({}).exec()
    if (users.length > 0) {
        return
    }

    console.log('[INFO] Seeding database')

    // Seed Badges
    const badge1 = await new Badge({
        name: 'PRO',
        icon: 'https://cdn2.iconfinder.com/data/icons/iconfinder-logo/512/logo-pro-only-black-512.png',
    }).save()
    const badge2 = await new Badge({
        name: 'Cameraman',
        icon: 'https://static.thenounproject.com/png/683772-200.png',
    }).save()

    const topic1 = await new Topic({
        name: 'Fishing techniques',
        description: 'Share your fishing techniques',
        numberOfPosts: 0,
    }).save()
    const topic2 = await new Topic({
        name: 'Fishing stories',
        description: 'Share your fishing stories',
        numberOfPosts: 0,
    }).save()
    const topic3 = await new Topic({
        name: 'Fishing jokes',
        description: 'Share your fishing jokes',
        numberOfPosts: 0,
    }).save()

    // Seed Gears
    const gear1 = await new Gear({ name: 'Ultra Fishing Rod', kind: 'ROD', yearOfProduction: 2020 }).save()
    const gear2 = await new Gear({ name: 'Super Reel', kind: 'REEL', yearOfProduction: 2020 }).save()
    const gear3 = await new Gear({ name: 'Mega Bait', kind: 'BAIT', yearOfProduction: 2020 }).save()

    // // Seed Users with Badge IDs
    const user1 = await new User({
        username: 'anglerJoe',
        password: bcrypt.hashSync('anglerJoe', 10),
        dateOfRegistration: new Date(),
        description: 'This is an admin account',
        profilePicture:
            'https://fastly.picsum.photos/id/275/400/400.jpg?hmac=QPpD-zGWMkCg7fycATzfgXa6jto_B8wbk2cc_pD7gXY',
        location: 'Admin Island',
        score: 0,
        rank: 'Newbie',
        badges: [badge1._id],
        gears: [gear1._id, gear2._id, gear3._id],
        topics: [topic1._id, topic2._id, topic3._id],
    }).save()

    const user2 = await new User({
        username: 'user',
        password: bcrypt.hashSync('user', 10),
        dateOfRegistration: new Date(),
        description: 'This is a user account',
        profilePicture:
            'https://fastly.picsum.photos/id/582/400/400.jpg?hmac=TA_vPjaKnP8UyoaE2h_3AKYki5XtZ68_EQsRwuFuSXc',
        location: 'User Island',
        score: 0,
        rank: 'Newbie',
        badges: [badge2._id],
        gears: [gear1._id, gear2._id, gear3._id],
        topics: [topic1._id, topic2._id, topic3._id],
    }).save()

    const fishingSpot1 = await new FishingSpot({
        name: 'Lake',
        longitude: 54.5,
        latitude: 21.21,
        description: 'This is a lake',
        rating: 4,
        type: 'Lake',
        image: 'https://fastly.picsum.photos/id/257/400/400.jpg?hmac=BAbnJh6aa9FSn7Lapzb6VC17SvkTFIp0H1QClhKHu_M',
        author: user1._id,
    }).save()
    const fishingSpot2 = await new FishingSpot({
        name: 'River',
        longitude: 54.6,
        latitude: 21.24,
        description: 'This is a river',
        rating: 5,
        type: 'River',
        image: 'https://fastly.picsum.photos/id/38/400/400.jpg?hmac=VdxBWTyewM2Fm8d9pexcS4ENL8m0-s6_tqmohKgCSeM',
    }).save()

    // Seed Friends with User IDs
    const friend1 = await new Friend({ friend: user1._id, since: new Date() }).save()
    const friend2 = await new Friend({ friend: user2._id, since: new Date() }).save()

    // Seed Posts with User and Topic IDs
    const post1 = await new Post({
        title: 'Fishing techniques',
        content: 'This is a fishing technique',
        creationDate: new Date(),
        type: 'Post',
        topic: topic1._id,
        author: user1._id,
        responses: [],
    }).save()

    const post2 = await new Post({
        title: 'Fishing stories',
        content: 'This is a fishing story',
        creationDate: new Date(),
        type: 'Post',
        topic: topic2._id,
        author: user2._id,
        responses: [],
    }).save()

    const response1 = await new Response({
        content: 'This is a response',
        creationDate: new Date(),
        post: post1._id,
        author: user2._id,
    }).save()

    const response2 = await new Response({
        content: 'This is another response',
        creationDate: new Date(),
        post: post2._id,
        author: user1._id,
    }).save()

    // update post responses
    post1.responses.push(response1._id)
    post2.responses.push(response2._id)
    await post1.save()
    await post2.save()

    // update topic posts
    topic1.lastPost = post1._id
    topic2.lastPost = post2._id
    topic1.numberOfPosts = 1
    topic2.numberOfPosts = 1
    await topic1.save()
    await topic2.save()

    // update user posts
    user1.posts.push(post1._id)
    user2.posts.push(post2._id)
    await user1.save()
    await user2.save()

    // update user friends
    user1.friends.push(friend1._id)
    user2.friends.push(friend2._id)
    await user1.save()
    await user2.save()

    // update user fishing spots
    user1.fishingSpots.push(fishingSpot1._id)
    user2.fishingSpots.push(fishingSpot2._id)
    await user1.save()
    await user2.save()
}

export default seedDB
