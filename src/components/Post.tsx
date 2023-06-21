import React from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import Author from './Author';
import Comments from './Comments';
import AddComment from './AddComment';
import useUser from '../data/hooks/useUser';

export default (props: any) => {
  const {email} = useUser();

  const getImage = (source: any): ImageSourcePropType => {
    if (typeof source === 'number') {
      return source;
    }
    if (typeof source === 'string') {
      return {uri: source};
    }
    return 0;
  };

  const addComment = email ? <AddComment postId={props.id} /> : null;

  return (
    <View style={styles.container}>
      {props.image && (
        <Image source={getImage(props.image)} style={styles.image} />
      )}
      <Author email={props.email} nickname={props.nickname} />
      <Comments comments={props.comments} />
      {addComment}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').width,
    height: (Dimensions.get('window').width * 3) / 4,
    resizeMode: 'contain',
  },
});
