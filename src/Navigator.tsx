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
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feed from './screens/Feed';
import AddPhoto from './screens/AddPhoto';
import Profile from './screens/Profile';
import Login from './screens/Login';
import Register from './screens/Register';
import useUser from './data/hooks/useUser';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

type StackNavigation = {
  Profile: undefined;
  Auth: undefined;
};

export type StackTypes = NativeStackNavigationProp<StackNavigation>;

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

const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Profile" screenOptions={screenOptions}>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="AddPhoto" component={AddPhoto} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const AuthNavigator = () => {
  const {email} = useUser();

  const authOrProfile = () => {
    if (email) {
      return TabNavigator;
    } else {
      return Login;
    }
  };

  const teste = authOrProfile();

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Home">
      <Stack.Screen name="Home" component={teste} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default Navigator;

/*
const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Profile" screenOptions={screenOptions}>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="AddPhoto" component={AddPhoto} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Auth">
      <Stack.Screen name="Auth" component={Login} />
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};

export default Navigator;
*/
