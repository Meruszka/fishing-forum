# Fishing-Forum Backend Service API Documentation

## Overview
This document provides the API documentation for the Fishing-Forum backend service. The backend is designed to support a forum dedicated to fishing enthusiasts. All requests and responses are formatted in JSON.

# HTTP

## Base URL
The base URL for all API endpoints is `http://<your-domain>/`

## Authentication
The Fishing-Forum backend service uses JSON Web Tokens (JWT) for authenticating requests. The JWT is expected to be sent in the `Authorization` header of each request that requires authentication.


## Error Handling
Some of the common error responses and their meanings:

- **400 Bad Request**: This status is commonly returned when the JWT token provided in the request is invalid or malformed. The corresponding error message is `'Invalid Token'`.

- **401 Unauthorized**: This status is returned when a request is made to a protected route without a valid JWT token. It indicates that the client has not been authenticated and the server is refusing to respond to the request due to lack of proper authentication credentials. The typical error message for this scenario is `'Access Denied: No Token Provided!'`.

- **403 Forbidden**: This status might be returned when a user tries to access a resource that they don't have permission to access. It indicates that the server understood the request but refuses to authorize it.

- **404 Not Found**: This status is returned when the requested resource (e.g., a specific API endpoint) could not be found. It means that the server can't find the requested resource. Links that lead to a 404 page are often called broken or dead links.

- **500 Internal Server Error**: While not explicitly mentioned in the provided code, this status code is used as a generic response for unexpected server-side errors. It indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.


## User Authentication Endpoints

### AuthController
Manages user authentication, providing endpoints for user login and registration.

#### `/user/login`
- **Method**: POST
- **Description**: Authenticates a user by their username and password. Returns a JWT token upon successful authentication.
- **Authentication Required**: No
- **Request Body**:
```json
{
"username": "user123",
"password": "password"
}
```
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "token": "<JWT token>"
    }
    ```

#### `/user/register`
- **Method**: POST
- **Description**: Registers a new user with a username and password. Returns a JWT token upon successful registration.
- **Authentication Required**: No
- **Request Body**:
    ```json
    {
    "username": "newuser",
    "password": "newpassword"
    }
    ```
- **Success Response**:
  - **Code**: 200 OK
  - **Content**:
    ```json
    {
      "token": "<JWT token>"
    }
    ```

## User Controller Endpoints

### UserController
Manages operations related to user data.

#### `/user/self`
- **Method**: GET
- **Description**: Retrieves the data of the currently authenticated user.
- **Authentication Required**: Yes


#### `/user/username/:username`
- **Method**: GET
- **Description**: Retrieves user data based on the provided username.
- **Authentication Required**: No

#### `/user/:id`
- **Method**: GET
- **Description**: Retrieves user data based on the provided user ID.
- **Authentication Required**: No

#### `/user/:id`
- **Method**: PUT
- **Description**: Updates the user data for the specified user ID. Only accessible by the user corresponding to the ID.
- **Authentication Required**: Yes
- **Request Body**:
```json
{
// User data fields to be updated
}
```

#### `/user/:id`
- **Method**: DELETE
- **Description**: Deletes the user with the specified user ID. Only accessible by the user corresponding to the ID.
- **Authentication Required**: Yes

#### `/user/:id/friend`
- **Method**: POST
- **Description**: Adds a friend to the user's friend list. User ID is obtained from the JWT token.
- **Authentication Required**: Yes
- **Request Parameters**:
- `id`: ID of the friend to be added

#### `/user/:id/friend`
- **Method**: DELETE
- **Description**: Removes a friend from the user's friend list. User ID is obtained from the JWT token.
- **Authentication Required**: Yes
- **Request Parameters**:
- `id`: ID of the friend to be removed

#### `/user/:id/gear`
- **Method**: POST
- **Description**: Adds gear to the user's gear list. User ID is obtained from the JWT token.
- **Authentication Required**: Yes
- **Request Body**:
```json
{
// Gear data fields
}
```

#### `/user/:userid/gear/:id`
- **Method**: DELETE
- **Description**: Removes gear from the user's gear list. User ID is obtained from the JWT token.
- **Authentication Required**: Yes
- **Request Parameters**:
- `userid`: User ID
- `id`: Gear ID to be removed


## Topic Controller Endpoints

### TopicController
Manages operations related to forum topics.

#### `/topic`
- **Method**: GET
- **Description**: Retrieves a list of all topics.
- **Authentication Required**: No

#### `/topic/:id`
- **Method**: GET
- **Description**: Retrieves detailed information for a specific topic based on the topic ID.
- **Authentication Required**: No
- **Request Parameters**:
  - `id`: The unique identifier of the topic


## Post Controller Endpoints

### PostController
Manages operations related to forum posts and responses.

#### `/post/:id`
- **Method**: GET
- **Description**: Retrieves detailed information for a specific post based on the post ID.
- **Authentication Required**: No
- **Request Parameters**:
  - `id`: The unique identifier of the post

#### `/post/topic/:id`
- **Method**: GET
- **Description**: Retrieves all posts associated with a specific topic.
- **Authentication Required**: No
- **Request Parameters**:
  - `id`: The unique identifier of the topic

#### `/post/topic/:id`
- **Method**: POST
- **Description**: Creates a new post in a specific topic. Requires user authentication.
- **Authentication Required**: Yes
- **Request Parameters**:
  - `id`: The unique identifier of the topic
- **Request Body**:
```json
{
  "title": "Post Title",
  "content": "Post Content"
}
```

#### `/post/:id`
- **Method**: POST
- **Description**: Adds a response to a specific post. Requires user authentication.
- **Authentication Required**: Yes
- **Request Parameters**:
- `id`: The unique identifier of the post
- **Request Body**:
```json
{
  "content": "Response Content"
}
```

#### `/post`
- **Method**: GET
- **Description**: Retrieves a list of recent posts. The number of posts returned can be specified in the query parameter `n`.
- **Authentication Required**: No
- **Query Parameters**:
- `n`: Number of recent posts to retrieve (default is 5)

#### `/post/:id`
- **Method**: DELETE
- **Description**: Deletes a specific post. Only accessible by the user who created the post.
- **Authentication Required**: Yes
- **Request Parameters**:
- `id`: The unique identifier of the post

#### `/post/:postid/response/:id`
- **Method**: DELETE
- **Description**: Deletes a specific response from a post. Only accessible by the user who created the response.
- **Authentication Required**: Yes
- **Request Parameters**:
- `postid`: The unique identifier of the post
- `id`: The unique identifier of the response

## Fishing Spot Controller Endpoints

### FishingSpotController
Manages operations related to fishing spots.

#### `/fishingSpot/:id`
- **Method**: GET
- **Description**: Retrieves detailed information for a specific fishing spot based on the fishing spot ID.
- **Authentication Required**: No
- **Request Parameters**:
  - `id`: The unique identifier of the fishing spot

#### `/fishingSpot`
- **Method**: GET
- **Description**: Retrieves a list of all fishing spots.
- **Authentication Required**: No

#### `/fishingSpot`
- **Method**: POST
- **Description**: Adds a new fishing spot. Requires user authentication.
- **Authentication Required**: Yes
- **Request Body**:
```json
{
  "name": "Fishing Spot Name",
  "description": "Fishing Spot Description",
  "latitude": 0.0,
  "longitude": 0.0
}
```

#### `/fishingSpot/:id`
- **Method**: PATCH
- **Description**: Updates a specific fishing spot. Requires user authentication and can only be performed by the author of the fishing spot.
- **Authentication Required**: Yes
- **Request Parameters**:
- `id`: The unique identifier of the fishing spot
- **Request Body**:
```json
{
  "name": "Fishing Spot Name",
  "description": "Fishing Spot Description",
  "latitude": 0.0,
  "longitude": 0.0
}
```

#### `/fishingSpot/:id`
- **Method**: DELETE
- **Description**: Deletes a specific fishing spot. Requires user authentication and can only be performed by the author of the fishing spot.
- **Authentication Required**: Yes
- **Request Parameters**:
- `id`: The unique identifier of the fishing spot


## Conversation Controller Endpoints

### ConversationController
Manages operations related to user conversations and messaging.

#### `/conversation/:interlocutorId`
- **Method**: GET
- **Description**: Retrieves the conversation between the authenticated user and the specified interlocutor.
- **Authentication Required**: Yes
- **Request Parameters**:
  - `interlocutorId`: The unique identifier of the interlocutor (the other participant in the conversation)

#### `/conversation`
- **Method**: GET
- **Description**: Retrieves all conversations of the authenticated user.
- **Authentication Required**: Yes

#### `/conversation`
- **Method**: POST
- **Description**: Sends a message to a conversation. If the conversation does not exist, it will be created.
- **Authentication Required**: Yes
- **Request Body**:
```json
{
    "content": "Message Content",
    "interlocutorId": "<ID of the interlocutor>"
}
```

#### `/conversation/:conversationId`
- **Method**: PUT
- **Description**: Marks all messages in a conversation as read by the authenticated user.
- **Authentication Required**: Yes
- **Request Parameters**:
- `conversationId`: The unique identifier of the conversation


## Database Models Documentation

### Badge
Represents badges that can be earned by users.
- **Fields**:
  - `name`: String - Name of the badge.
  - `icon`: String - URL or identifier for the badge icon.

### Gear
Represents fishing gear owned by users.
- **Fields**:
  - `name`: String - Name of the gear.
  - `yearOfProduction`: Number - Year of production of the gear.
  - `kind`: String - Type of the gear, one of `Rod`, `Reel`, `Bait`, `Line`, `Other`.

### FishingSpot
Represents fishing spots added by users.
- **Fields**:
  - `name`: String - Name of the fishing spot.
  - `longitude`: Number - Longitude coordinate.
  - `latitude`: Number - Latitude coordinate.
  - `description`: String - Description of the spot.
  - `rating`: Number - Rating of the spot (0-5).
  - `type`: String - Type of fishing spot, one of `Lake`, `River`, `Pond`, `Sea`, `Ocean`, `Other`.
  - `image`: String - URL of the image for the fishing spot.
  - `author`: ObjectId (ref: 'User') - Reference to the user who added the spot.

### Conversation
Represents conversations between users.
- **Fields**:
  - `lastMessage`: ObjectId (ref: 'Message') - Reference to the last message in the conversation.
  - `members`: Array of ObjectId (ref: 'User') - References to users participating in the conversation.
  - `messages`: Array of ObjectId (ref: 'Message') - References to messages in the conversation.

### Message
Represents messages within conversations.
- **Fields**:
  - `content`: String - Content of the message.
  - `date`: Date - Date the message was sent.
  - `isRead`: Boolean - Indicates if the message has been read.
  - `sender`: ObjectId (ref: 'User') - Reference to the user who sent the message.

### Post
Represents posts in forum topics.
- **Fields**:
  - `title`: String - Title of the post.
  - `content`: String - Content of the post.
  - `creationDate`: Date - Date of creation of the post.
  - `type`: String - Type of the post, currently `Post`.
  - `lastResponse`: ObjectId (ref: 'Response') - Reference to the last response to the post.
  - `topic`: ObjectId (ref: 'Topic') - Reference to the topic the post belongs to.
  - `author`: ObjectId (ref: 'User') - Reference to the user who created the post.
  - `responses`: Array of ObjectId (ref: 'Response') - References to responses to the post.

### Response
Represents responses to forum posts.
- **Fields**:
  - `content`: String - Content of the response.
  - `creationDate`: Date - Date of creation of the response.
  - `author`: ObjectId (ref: 'User') - Reference to the user who created the response.
  - `post`: ObjectId (ref: 'Post') - Reference to the post the response belongs to.

### Topic
Represents topics within the forum.
- **Fields**:
  - `name`: String - Name of the topic.
  - `description`: String - Description of the topic.
  - `numberOfPosts`: Number - Count of posts in the topic.
  - `lastPost`: ObjectId (ref: 'Post') - Reference to the last post in the topic.

### User
Represents users of the forum.
- **Fields**:
  - `username`: String - Username of the user.
  - `dateOfRegistration`: Date - Date when the user registered.
  - `description`: String - Description provided by the user.
  - `profilePicture`: String - URL of the user's profile picture.
  - `location`: String - Location of the user.
  - `score`: Number - Score accumulated by the user.
  - `rank`: String - Rank of the user based on score.
  - `password`: String - Password (hashed) for user authentication.
  - `posts`: Array of ObjectId (ref: 'Post') - References to posts created by the user.
  - `badges`: Array of ObjectId (ref: 'Badge') - References to badges earned by the user.
  - `gear`: Array of ObjectId (ref: 'Gear') - References to gear owned by the user.
  - `conversations`: Array of ObjectId (ref: 'Conversation') - References to conversations participated by the user.
  - `friends`: Array of ObjectId (ref: 'Friend') - References to friends of the user.
  - `fishingSpots`: Array of ObjectId (ref: 'FishingSpot') - References to fishing spots added by the user.


# WebSocket

## Base URL

The base URL for all WebSocket endpoints is `ws://<your-domain>/ws`

## Authentication

The Fishing-Forum backend service uses JSON Web Tokens (JWT) for authenticating WebSocket connections. The JWT is expected to be sent in the payload of the every websocket message.

```json
{
  "token":"<JWT token>"
}
```

## Payload schema

The following schema is used for the payload of WebSocket messages:

```json
{
  "token":"<JWT TOKEN>",
  "action":"<ACTION>",
  "data": {
    "field1": "value1",
    "field2": "value2",
  }
}
```

## Inbound messages

### `ping`

Used for testing the connection. The server will respond with a `pong` message and clientCount.

**Request payload**
```json
{
  "token":"<JWT TOKEN>",
  "action":"ping",
}
```

**Response payload**
```json
{
  "action":"ping",
  "data": {
    "response": "pong",
    "clientCount": 1
  }
}
```

## Outbound messages

### `newMessage`

**Request payload**
```json
{
  "action":"newMessage",
  "data": {
    "conversationId": "<CONVERSATION ID>",
    "message": {
      "_id": "<MESSAGE ID>",
      "content": "Message Content",
      "date": "2021-05-01T12:00:00.000Z",
      "isRead": false,
      "sender": {
        "_id": "<USER ID>",
        "username": "user123",
        "profilePicture": "https://example.com/profile.jpg"
      }
    }
  }
}
```

### `markAsRead`

**Request payload**
```json
{
  "action":"markAsRead",
  "data": {
    "conversationId": "<CONVERSATION ID>",
  }
}
```