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

export interface Topic extends Entity {
  name: string;
  description: string;
  numberOfPosts: number;
  lastPost?: Post | null;
}

export interface Post extends Entity {
  title: string;
  content: string;
  creationDate: string;
  type: string;
  topic: { _id: string, name: string };
  author: { _id: string, username: string, profilePicture: string };
  responses: Response[];
  lastResponse: Response | null;
}

export interface Response extends Entity {
  content: string;
  creationDate: string;
  author: { _id: string, username: string, profilePicture: string };
  post: { _id: string};
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
  friend: { username: string, _id: string, profilePicture: string }
}

export interface FishingSpot extends Entity {
  name: string,
  longitude: number,
  latitude: number,
  description: string,
  rating: number,
  type: string,
  image: string,
  author: { _id: string, username: string, profilePicture: string },
}
