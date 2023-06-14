import React, {createContext, useState} from 'react';

const UserContext = createContext({
  name: '',
  email: '',
  login: (_email: string, _password: string) => {},
  logout: () => {},
});

export const UserProvider = ({children}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const userInternalContext = {
    name,
    email,
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
