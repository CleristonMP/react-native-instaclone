import React, {createContext, useState} from 'react';
import useEvent from '../hooks/useEvent';
import {PostType} from '../../types/post';
import {CommentType} from '../../types/comment';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

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
        const rawPosts: PostType[] = [];

        ref.onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            const post = doc.data() as PostType;
            rawPosts.push({...post, id: doc.ref.id});
          });
        });

        setPosts(rawPosts);
      } catch (err: any) {
        setMessage(err.message, 'Erro');
      }
    },
    addPost: async function (post: PostType) {
      try {
        let imgUrl = null;
        startingUpload();
        if (post.image) {
          if (post.image.uri.includes('file://')) {
            post.image.uri = post.image.uri.replace('file://', '');
          }

          const imgRef = storage().ref(`/com/instaclone/${post.image.uri}`);

          await imgRef
            .putFile(post.image.uri)
            .then(() => {
              imgRef.getDownloadURL().then(resp => {
                imgUrl = resp;
                ref
                  .add({...post, image: imgUrl, id: Math.random().toString(36)})
                  .catch(e => {
                    console.error(e);
                  });
              });
            })
            .catch(e => console.error(e));
        } else {
          await ref
            .add({...post, image: imgUrl, id: Math.random().toString(36)})
            .catch(e => {
              console.error(e);
            });
        }
        finishedUpload();
      } catch (err: any) {
        setMessage(err.message, 'Erro');
        finishedUpload();
      }
    },
    addComment: async function (postId: any, comment: CommentType) {
      try {
        ref
          .doc(postId)
          .get()
          .then(resp => {
            const post = resp.data() as PostType;
            post.comments.push(comment);
            ref
              .doc(postId)
              .update(post)
              .catch(e => console.error(e));
          })
          .catch(e => console.error(e))
          .finally(() => {
            feedInternalContext.fetchPosts();
          });
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
