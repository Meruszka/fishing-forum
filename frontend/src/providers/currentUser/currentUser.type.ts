export interface CurrentUserContextProps {
  currentUser: User | null;
}

export interface User extends Entity {
  username: string,
  dateOfRegistration: string,
  description: string,
  profilePicture: string,
  location: string,
  score: number,
  rank: string,
  password: string,
  posts: Post[],
  badges: Badge[],
  gear: Gear[],
  conversations: Conversation[],
  friends: Friend[],
  fishingSpots: FishingSpot[],
}

export interface Entity {
  _id: string,
}

export interface Post extends Entity {
  title: string,
  description: string,
  date: Date,
}

export interface Badge extends Entity {
  name: string,
  icon: string,
}

export interface Gear extends Entity {
  name: string,
  description: string,
}

export interface Conversation extends Entity {
  messages: Message[],
}

export interface Message {
  user: User,
  message: string,
  date: Date,
}

export interface Friend extends Entity {
  user: User,
  since: Date,
}

export interface FishingSpot extends Entity {
  name: string,
  longitude: number,
  latitude: number,
  description: string,
  rating: number,
  type: string,
  image: string,
  author: User,
}