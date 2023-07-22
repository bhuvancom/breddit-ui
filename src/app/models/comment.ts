import User from "./user"

export interface Comment {
    commentId: number,
    text: string,
    commentBy:User,
    commentDate: string,
    myComment: boolean
}