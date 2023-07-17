import User from "./user";

export default interface Subreddit {
    id: number,
    name: string,
    description: string,
    numberOfPosts: number,
    creator: User | undefined,
    creationDate: string
}