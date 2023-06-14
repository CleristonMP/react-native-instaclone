import {CommentType} from './comment';

export type PostType = {
  id: number;
  nickname: string;
  email: string;
  image: string;
  comments: CommentType[];
};
