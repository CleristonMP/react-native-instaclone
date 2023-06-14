import React from 'react';
import {AppRegistry} from 'react-native';
import Navigator from './src/Navigator';
import {name as appName} from './app.json';
import {UserProvider} from './src/data/contexts/UserContext';
import {EventProvider} from './src/data/contexts/EventContext';
import {FeedProvider} from './src/data/contexts/FeedContext';

const Root = () => (
  <EventProvider>
    <UserProvider>
      <FeedProvider>
        <Navigator />
      </FeedProvider>
    </UserProvider>
  </EventProvider>
);

AppRegistry.registerComponent(appName, () => Root);
