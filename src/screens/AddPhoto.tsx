import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Platform,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {
  CameraOptions,
  ImageLibraryOptions,
  MediaType,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import useUser from '../data/hooks/useUser';
import useFeed from '../data/hooks/useFeed';
import {PostType} from '../types/post';
import useEvent from '../data/hooks/useEvent';

export default (props: any) => {
  const [image, setImage] = useState<any>();
  const [comment, setComment] = useState('');

  const {addPost} = useFeed();
  const {user} = useUser();
  const {uploading} = useEvent();

  const canEdit = () =>
    user.email != null && user.email.trim() !== '' && !uploading;

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Permissão para usar a câmera',
            message: 'O App precisa da sua permissão para utilizar a câmera',
            buttonPositive: 'Permitir',
            buttonNegative: 'Não permitir',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Permissão para usar a galeria',
            message: 'O App precisa da sua permissão para utilizar a galeria',
            buttonPositive: 'Permitir',
            buttonNegative: 'Não permitir',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err: any) {
        console.warn(err);
        Alert.alert('Write permission err', err);
      }
      return false;
    } else {
      return true;
    }
  };

  const [newPost, setNewPost] = useState<PostType>({
    id: Math.random(),
    email: user.email,
    nickname: user.name,
    image,
    comments: [
      {
        nickname: user.name,
        comment,
      },
    ],
  });

  const pickPhoto = async (type: MediaType) => {
    const options: CameraOptions = {
      quality: 1,
      mediaType: type,
      includeBase64: true,
      saveToPhotos: true,
      maxHeight: 600,
      maxWidth: 800,
    };

    const isCameraPermitted = await requestCameraPermission();
    const isStoragePermitted = await requestExternalWritePermission();

    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, resp => {
        if (!resp.didCancel) {
          const pickedImg = resp.assets !== undefined ? resp.assets[0] : null;
          setImage(pickedImg);
          setNewPost({...newPost, image: pickedImg});
        } else if (resp.errorCode === 'camera_unavailable') {
          Alert.alert('A câmera não está disponível no seu dispositivo');
          return;
        } else if (resp.errorCode === 'permission') {
          Alert.alert('Sem permissão para utilizar a câmera');
          return;
        } else if (resp.errorCode === 'others' && resp.errorMessage) {
          Alert.alert(resp.errorMessage);
          return;
        }
      });
    }
  };

  const pickImage = async (type: MediaType) => {
    const options: ImageLibraryOptions = {
      mediaType: type,
      includeBase64: true,
      maxHeight: 600,
      maxWidth: 800,
      quality: 1,
    };

    await launchImageLibrary(options, resp => {
      if (!resp.didCancel) {
        const pickedImg = resp.assets !== undefined ? resp.assets[0] : null;
        setImage(pickedImg);
        setNewPost({...newPost, image: pickedImg});
      } else if (resp.errorCode === 'permission') {
        Alert.alert('Sem permissão para utilizar a galeria');
        return;
      } else if (resp.errorCode === 'others' && resp.errorMessage) {
        Alert.alert(resp.errorMessage);
        return;
      }
    });
  };

  const handleCommentChange = (newComment: string) => {
    setComment(newComment);
    setNewPost({...newPost, comments: [{nickname: user.name, comment}]});
  };

  const save = () => {
    addPost({...newPost, id: Math.random()});
    setImage(null);
    setComment('');
    props.navigation.navigate('Feed');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Compartilhe uma imagem</Text>
        <View style={styles.imgContainer}>
          {image && <Image source={{uri: image.uri}} style={styles.image} />}
        </View>
        <View style={styles.btnRow}>
          <TouchableOpacity
            onPress={() => pickPhoto('photo')}
            disabled={!canEdit()}
            style={[styles.button, canEdit() ? {} : styles.btnDisabled]}>
            <Text style={styles.btnText}>Tirar uma foto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => pickImage('photo')}
            disabled={!canEdit()}
            style={[styles.button, canEdit() ? {} : styles.btnDisabled]}>
            <Text style={styles.btnText}>Escolha a foto</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Algum comentário para a foto?"
          style={styles.input}
          value={comment}
          onChangeText={handleCommentChange}
          editable={canEdit()}
        />
        <TouchableOpacity
          onPress={save}
          disabled={!canEdit()}
          style={[styles.button, canEdit() ? {} : styles.btnDisabled]}>
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
  btnDisabled: {
    backgroundColor: '#666',
  },
});
