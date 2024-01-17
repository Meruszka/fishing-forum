export interface Post {
    _id: string;
    title: string;
    content: string;
    creationDate: Date;
    type: string;
    topic: { _id: string } | null;
    author: { _id: string };
    responses: { _id: string }[];
}


export const getInitialPosts = (): Post[] => {
    return [
      {
        _id: "1",
        title: "Post 1",
        content: "Content of post 1",
        creationDate: new Date(),
        type: "Type 1",
        topic: { _id: "1" },
        author: { _id: "user1" },
        responses: []
      },
      {
        _id: "2",
        title: "Post 2",
        content: "Content of post 2",
        creationDate: new Date(),
        type: "Type 2",
        topic: { _id: "2" },
        author: { _id: "user2" },
        responses: []
      },
      {
        _id: "3",
        title: "Post 3",
        content: "Content of post 3",
        creationDate: new Date(),
        type: "Type 1",
        topic: { _id: "1" },
        author: { _id: "user3" },
        responses: []
      },
      {
        _id: "4",
        title: "Post 4",
        content: "Content of post 4",
        creationDate: new Date(),
        type: "Type 2",
        topic: { _id: "2" },
        author: { _id: "user4" },
        responses: []
      },
      {
        _id: "5",
        title: "Post 5",
        content: "Content of post 5",
        creationDate: new Date(),
        type: "Type 3",
        topic: { _id: "3" },
        author: { _id: "user5" },
        responses: []
      }
    ];
};