export type User = {
  username: string;
  avatar?: string;
  aboutme?: string;
  location?: string;
  ifcheckmark?: boolean;
  password: string;
};

export type Post = {
  post_id: number;
  username: string;
  content: string;
  date: Date;
  ifreply: number;
};
