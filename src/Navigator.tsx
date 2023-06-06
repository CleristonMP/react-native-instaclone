import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feed from './screens/Feed';

const Tab = createBottomTabNavigator();

const screenOptions:
  | BottomTabNavigationOptions
  | ((props: {
      route: RouteProp<ParamListBase, string>;
      navigation: any;
    }) => BottomTabNavigationOptions) = props => {
  let option: BottomTabNavigationOptions = {
    tabBarShowLabel: false,
    tabBarActiveTintColor: '#4D4DFF',
    headerShown: false,
  };

  const {route} = props;
  if (route.name === 'Feed') {
    option = {
      ...option,
      title: 'Feed',
      tabBarIcon: ({color}) => <Icon name="home" size={30} color={color} />,
    };
  } else if (route.name === 'AddPhoto') {
    option = {
      ...option,
      title: 'Add Picture',
      tabBarIcon: ({color}) => <Icon name="camera" size={30} color={color} />,
    };
  } else if (route.name === 'Profile') {
    option = {
      ...option,
      title: 'Profile',
      tabBarIcon: ({color}) => <Icon name="user" size={30} color={color} />,
    };
  }
  return option;
};

export default function Navigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Feed" screenOptions={screenOptions}>
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name="AddPhoto" component={Feed} />
        <Tab.Screen name="Profile" component={Feed} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
