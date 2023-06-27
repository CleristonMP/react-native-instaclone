import React, {createContext, useState} from 'react';
import {UserType} from '../../types/user';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import useEvent from '../hooks/useEvent';

const UserContext = createContext({
  name: '',
  email: '',
  createUser: (_user: UserType) => {},
  login: (_email: string, _password: string) => {},
  logout: () => {},
});

const usersCollection = firestore().collection('users');

export const UserProvider = ({children}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const {setMessage} = useEvent();

  const userInternalContext = {
    name,
    email,
    createUser: async (user: UserType) => {
      try {
        auth()
          .createUserWithEmailAndPassword(user.email, user.password)
          .then(resp => {
            console.log(resp);
            usersCollection.doc(auth().currentUser?.uid).set({
              name: user.name,
              email: user.email,
            });
          })
          .catch(err => console.error(err));
      } catch (err: any) {
        setMessage(err.message, 'Erro');
      }
    },
    login: function (inputEmail: string, _password: string) {
      setName('Temporario');
      setEmail(inputEmail);
    },
    logout: function () {
      setName('');
      setEmail('');
    },
  };

  return (
    <UserContext.Provider value={userInternalContext}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
