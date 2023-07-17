import Subreddit from "./subreddits";
import User from "./user";

export default interface Post {
    postId: number;
    subreddit: Subreddit;
    user: User;
    title: string;
    description: string;
    voteCount: number;
    commentCount: number;
    creationDate: string;
}