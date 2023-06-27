import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Gravatar} from 'react-native-gravatar';
import useUser from '../data/hooks/useUser';

export default () => {
  const [email, setEmail] = useState('');

  const {user} = useUser();

  useEffect(() => {
    setEmail(user.email);
  }, [user.email]);

  const options = {email, secure: true};

  return (
    <View style={styles.container}>
      <Gravatar options={options} style={styles.avatar} />
      <Text style={styles.nickname}>{user.name}</Text>
      <Text style={styles.email}>{email}</Text>
      <TouchableOpacity onPress={() => {}} style={styles.button}>
        <Text style={styles.btnText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 100,
  },
  nickname: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
  },
  email: {
    marginTop: 20,
    fontSize: 25,
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
});
