export type User = {
  username: string;
  displayname: string;
  avatar?: string;
  background?: string;
  aboutme?: string;
  location?: string;
  ifcheckmark?: boolean;
  password: string;
  date: Date;
};

export type Post = {
  post_id: number;
  username: string;
  content?: string;
  date: Date;
  ifreply?: number;
  ifretweet?: number;
  media_url?: string;
  media_type?: string;
};

export type Message = {
  sender: string;
  recipient: string;
  content?: string;
  media_url?: string;
  media_type?: string;
  id: number;
  date: Date;
};

export type Follow = {
  follower: string;
  following: string;
  id: number;
  date: Date;
};

export type Like = {
  username: string;
  id: number;
  date: Date;
};

export type FollowData = {
  followerCounts: Record<string, number>;
  followingCounts: Record<string, number>;
  notifications: Follow[];
};

export type LikeData = {
  likeCounts: Record<number, number>;
  notifications: Like[];
};
