import React from 'react';
import {AppRegistry} from 'react-native';
import Navigator from './src/Navigator';
import {name as appName} from './app.json';
import {UserProvider} from './src/data/contexts/UserContext';

const Root = () => (
  <UserProvider>
    <Navigator />
  </UserProvider>
);

AppRegistry.registerComponent(appName, () => Root);
