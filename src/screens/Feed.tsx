import React, {Component} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import Header from '../components/Header';
import Post from '../components/Post';

export default class Feed extends Component {
  state = {
    posts: [
      {
        id: Math.random(),
        nickname: 'Rafael Filho',
        email: 'rafa@gmail.com',
        image: require('../../assets/imgs/fence.jpg'),
        comments: [
          {
            nickname: 'John Sheldon',
            comment: 'Stunning!',
          },
          {
            nickname: 'Ana Julia',
            comment: 'Foto linda!',
          },
        ],
      },
      {
        id: Math.random(),
        nickname: 'Chico Lima',
        email: 'chicao@gmail.com',
        image: require('../../assets/imgs/bw.jpg'),
        comments: [],
      },
    ],
  };

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <FlatList
          data={this.state.posts}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => <Post key={item.id} {...item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
