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

  const {createUser} = useUser();

  const handleRegister = () => {
    createUser(user);
  };

  const handleCancelBtnPress = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        style={styles.input}
        autoFocus={true}
        value={user.name}
        onChangeText={name => setUser({...user, name})}
      />
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={user.email}
        onChangeText={email => setUser({...user, email})}
      />
      <TextInput
        placeholder="Senha"
        style={styles.input}
        secureTextEntry={true}
        value={user.password}
        onChangeText={password => setUser({...user, password})}
      />
      <View style={styles.btnsCtr}>
        <TouchableOpacity onPress={handleCancelBtnPress} style={styles.button}>
          <Text style={styles.btnText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.btnText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: 20,
    width: '90%',
    backgroundColor: '#EEE',
    height: 40,
    borderWidth: 1,
    borderColor: '#333',
    paddingLeft: 15,
  },
  btnsCtr: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '40%',
    marginTop: 30,
    padding: 10,
    backgroundColor: '#4286F4',
  },
  btnText: {
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
  },
});
