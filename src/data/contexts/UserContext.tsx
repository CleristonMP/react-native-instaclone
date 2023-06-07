import React, {createContext, useState} from 'react';

const UserContext = createContext({});

export const UserProvider = ({children}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const userInternalContext = {
    name,
    email,
    login: function (inputEmail: string, password: string) {
      inputEmail;
      password;
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
