import React, {Component} from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';

type Props = {
  image: ImageSourcePropType;
};

export default class Post extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Image source={this.props.image} style={styles.image} />
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
