import React, {createContext, useState} from 'react';
import {UserType} from '../../types/user';
import auth from '@react-native-firebase/auth';
import useEvent from '../hooks/useEvent';

const UserContext = createContext({
  user: {name: '', email: ''},
  createUser: (_user: UserType) => {},
  login: (_user: UserType) => {},
  logout: () => {},
});

export const UserProvider = ({children}: any) => {
  const [user, setUser] = useState<UserType>({
    name: '',
    email: '',
    password: '',
  });

  const {setMessage} = useEvent();

  const userInternalContext = {
    user,
    createUser: async (newUser: UserType) => {
      try {
        if (newUser.password) {
          auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then(resp => {
              console.log(resp);
              resp.user.updateProfile({displayName: newUser.name});
              setUser({
                name: resp.user.displayName ? resp.user.displayName : '',
                email: resp.user.email ? resp.user.email : '',
              });
            })
            .catch(err => console.error(err));
        }
      } catch (err: any) {
        setMessage(err.message, 'Erro');
      }
    },
    login: function (logUser: UserType) {
      if (logUser.password) {
        auth()
          .signInWithEmailAndPassword(logUser.email, logUser.password)
          .then(resp => {
            console.log(resp);
            if (resp.user.displayName && resp.user.email) {
              setUser({
                name: resp.user.displayName,
                email: resp.user.email,
              });
            }
          })
          .catch(err => console.error(err));
      }
    },
    logout: function () {
      // setName('');
      // setEmail('');
    },
  };

  return (
    <UserContext.Provider value={userInternalContext}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
