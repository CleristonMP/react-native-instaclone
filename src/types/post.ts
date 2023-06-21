import {CommentType} from './comment';

export type PostType = {
  id: string | number | null;
  nickname: string;
  email: string;
  image: any;
  comments: CommentType[];
};
