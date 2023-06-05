import React, {Component} from 'react';
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

type Props = {
  image: ImageSourcePropType;
  comments: any[];
  email: string;
  nickname: string;
};

export default class Post extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Image source={this.props.image} style={styles.image} />
        <Author email={this.props.email} nickname={this.props.nickname} />
        <Comments comments={this.props.comments} />
        <AddComment />
      </View>
    );
  }
}

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
