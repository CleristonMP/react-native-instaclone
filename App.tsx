import React, {Component} from 'react';
import {View} from 'react-native';

import Header from './src/components/Header';
import Post from './src/components/Post';

export default class App extends Component {
  render() {
    const comments = [
      {
        nickname: 'Joana Elena',
        comment: 'Excelente Foto!',
      },
      {
        nickname: 'Rafael Pereira',
        comment: 'Muito ruim! Faça melhor...',
      },
    ];
    return (
      <View style={{flex: 1}}>
        <Header />
        <Post image={require('./assets/imgs/fence.jpg')} comments={comments} />
      </View>
    );
  }
}
