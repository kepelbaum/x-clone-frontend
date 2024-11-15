export type User = {
  username: string;
  displayname: string;
  avatar?: string;
  background?: string;
  aboutme?: string;
  location?: string;
  ifcheckmark?: boolean;
  password: string;
  date: string;
};

export type Post = {
  post_id: number;
  username: string;
  content?: string;
  date: string;
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
  date: string;
};

export type Follow = {
  follower: string;
  following: string;
  id: number;
  date: string;
};

export type FollowData = {
  followerCounts: Record<string, number>;
  followingCounts: Record<string, number>;
  notifications: Follow[];
};

export type Like = {
  username: string;
  id: number;
  date: string;
  post_id: number;
  poster: string;
};

export type LikeData = {
  likeCounts: Record<number, number>;
  notifications: Like[];
};
