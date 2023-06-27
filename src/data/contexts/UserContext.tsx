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
              delete newUser.password;
              setMessage('Usuário cadastrado com sucesso!', 'Sucesso');
              resp.user.updateProfile({displayName: newUser.name});
              setUser({
                name: resp.user.displayName ? resp.user.displayName : '',
                email: resp.user.email ? resp.user.email : '',
              });
            })
            .catch((err: Error) => {
              setMessage(err.message, err.name);
            });
        }
      } catch (err: any) {
        setMessage(err.message, 'Erro');
      }
    },
    login: async function (logUser: UserType) {
      if (logUser.password) {
        auth()
          .signInWithEmailAndPassword(logUser.email, logUser.password)
          .then(resp => {
            if (resp.user.displayName && resp.user.email) {
              setUser({
                name: resp.user.displayName,
                email: resp.user.email,
              });
            }
          })
          .catch((err: Error) => {
            setMessage(err.message, err.name);
          });
      }
    },
    logout: function () {
      auth()
        .signOut()
        .then(() => setMessage('Usuário saiu', 'Logout'));
      setUser({
        email: '',
        name: '',
        password: '',
      });
    },
  };

  return (
    <UserContext.Provider value={userInternalContext}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
