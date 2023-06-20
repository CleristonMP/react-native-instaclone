import {CommentType} from './comment';

export type PostType = {
  id: number | null;
  nickname: string;
  email: string;
  image: any;
  comments: CommentType[];
};
