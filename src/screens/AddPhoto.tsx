import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Platform,
  Dimensions,
  Alert,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

type Img = {
  uri: string | undefined;
  base64: string | undefined;
};

export default () => {
  const [image, setImage] = useState<Img>();
  const [comment, setComment] = useState('');

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 600,
        maxWidth: 800,
      },
      resp => {
        if (!resp.didCancel) {
          setImage({uri: resp.assets![0].uri, base64: resp.assets![0].base64});
        }
      },
    );
  };

  const pickPhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
        saveToPhotos: true,
        maxHeight: 600,
        maxWidth: 800,
      },
      resp => {
        if (!resp.didCancel) {
          setImage({uri: resp.assets![0].uri, base64: resp.assets![0].base64});
        }
      },
    );
  };

  const save = async () => {
    Alert.alert('Imagem adicionada!', comment);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Compartilhe uma imagem</Text>
        <View style={styles.imgContainer}>
          {image && <Image source={{uri: image.uri}} style={styles.image} />}
        </View>
        <View style={styles.btnRow}>
          <TouchableOpacity onPress={pickPhoto} style={styles.button}>
            <Text style={styles.btnText}>Tirar uma foto</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImage} style={styles.button}>
            <Text style={styles.btnText}>Escolha a foto</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Algum comentário para a foto?"
          style={styles.input}
          value={comment}
          onChangeText={text => setComment(text)}
        />
        <TouchableOpacity onPress={save} style={styles.button}>
          <Text style={styles.btnText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginTop: Platform.OS === 'ios' ? 30 : 10,
    fontWeight: 'bold',
  },
  imgContainer: {
    width: '90%',
    height: Dimensions.get('window').width / 2,
    backgroundColor: '#EEE',
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').width / 2,
    resizeMode: 'center',
  },
  btnRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
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
  },
});
