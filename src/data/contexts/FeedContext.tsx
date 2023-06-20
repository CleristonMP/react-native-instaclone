import React, {createContext, useState} from 'react';
import useEvent from '../hooks/useEvent';
import {PostType} from '../../types/post';
import {CommentType} from '../../types/comment';
import firestore from '@react-native-firebase/firestore';
import mockPosts from '../mocks/mockPosts';

const FeedContext = createContext({
  posts: [] as PostType[],
  fetchPosts: () => {},
  addPost: (_post: PostType) => {},
  addComment: (_postId: number, _comment: CommentType) => {},
});

export const FeedProvider = ({children}: any) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const {startingUpload, finishedUpload, setMessage} = useEvent();

  const ref = firestore().collection('posts');

  const feedInternalContext = {
    posts,
    fetchPosts: async function () {
      try {
        // const res = await axios.get('/posts.json');
        const rawPosts = [...mockPosts];
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

        await ref
          .add({...post, id: null, image: null})
          .then(resp => {
            console.warn(Object.keys(resp));
          })
          .catch(e => {
            console.error(e);
          });

        // const newPosts = [...posts];
        // newPosts.push(post);
        // setPosts(newPosts);

        finishedUpload();
        // feedInternalContext.fetchPosts();
      } catch (err: any) {
        setMessage(err.message, 'Erro');
        finishedUpload();
      }
    },
    addComment: async function (postId: number, comment: CommentType) {
      try {
        const tempPosts = [...posts];
        tempPosts.find(post => post.id === postId)?.comments.push(comment);
        setPosts(tempPosts);
        feedInternalContext.fetchPosts();

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
