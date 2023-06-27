import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {UserType} from '../types/user';

import useUser from '../data/hooks/useUser';

export default (props: any) => {
  const [user, setUser] = useState<UserType>({
    name: '',
    email: '',
    password: '',
  });

  const {login} = useUser();

  const handleLogin = () => {
    login(user);
    props.navigation.navigate('Home');
  };

  const handleRegisterBtnTouch = () => {
    props.navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        style={styles.input}
        autoFocus={true}
        keyboardType="email-address"
        value={user.email}
        onChangeText={email => setUser({...user, email})}
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        value={user.password}
        secureTextEntry
        onChangeText={password => setUser({...user, password})}
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegisterBtnTouch} style={styles.button}>
        <Text style={styles.btnText}>Criar nova conta...</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#4286F4',
  },
  btnText: {
    fontSize: 20,
    color: '#FFF',
  },
  input: {
    marginTop: 20,
    width: '90%',
    backgroundColor: '#EEE',
    height: 40,
    borderWidth: 1,
    borderColor: '#333',
  },
});
