export interface VoteReq {
    voteType: VoteType;
}

type VoteType = 'UPVOTE' | 'DOWNVOTE';
