import React, {createContext, useState} from 'react';
import useEvent from '../hooks/useEvent';
import {PostType} from '../../types/post';
import {CommentType} from '../../types/comment';
import mockPosts from '../mocks/mockPosts';

const FeedContext = createContext({
  posts: [] as PostType[],
  fetchPosts: () => {},
  addPost: (_post: PostType) => {},
  addComment: (_postId: number, _comment: CommentType) => {},
});

export const FeedProvider = ({children}: any) => {
  const [initialPosts] = useState<PostType[]>(mockPosts);
  const [posts, setPosts] = useState<PostType[]>([]);
  const {startingUpload, finishedUpload, setMessage} = useEvent();

  const feedInternalContext = {
    posts,
    fetchPosts: async function () {
      try {
        // const res = await axios.get('/posts.json');
        const rawPosts = initialPosts;
        const postsTemp: PostType[] = [];
        for (let key in rawPosts) {
          postsTemp.push({
            ...rawPosts[key],
            id: Number(key),
          });
        }
        setPosts(postsTemp);
      } catch (err: any) {
        setMessage(err.message, 'Erro');
      }
    },
    addPost: async function (post: PostType) {
      try {
        startingUpload();
        const newPosts = [...posts];
        newPosts.push(post);
        setPosts(newPosts);
        // const resStorage = await axios({
        //   url: 'uploadImage',
        //   baseURL: 'https://us-central1-instaclone-b78e8.cloudfunctions.net',
        //   method: 'post',
        //   data: {
        //     image: post.image.base64,
        //   },
        // });
        // post.image = resStorage.data.imageUrl;
        // await axios.post(`/posts.json?auth=${token}`, post);
        finishedUpload();
        feedInternalContext.fetchPosts();
      } catch (err: any) {
        setMessage(err.message, 'Erro');
        finishedUpload();
      }
    },
    addComment: async function (_postId: number, _comment: CommentType) {
      try {
        // const res = await axios.get(`/posts/${postId}.json`);
        // const comments = res.data.comments || [];
        // comments.push(comment);
        // await axios.patch(`/posts/${postId}.json?auth=${token}`, {comments});
        feedInternalContext.fetchPosts();
      } catch (err: any) {
        setMessage(err.message, 'Erro');
      }
    },
  };

  return (
    <FeedContext.Provider value={feedInternalContext}>
      {children}
    </FeedContext.Provider>
  );
};

export default FeedContext;
