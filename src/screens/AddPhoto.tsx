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
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import useUser from '../data/hooks/useUser';
import useFeed from '../data/hooks/useFeed';
import {PostType} from '../types/post';
import useEvent from '../data/hooks/useEvent';

// import firestore from '@react-native-firebase/firestore';

export default (props: any) => {
  // const ref = firestore().collection('posts');

  // async function addFirestorePost(post: PostType) {
  //   await ref
  //     .add({post})
  //     .then(resp => {
  //       console.warn(resp);
  //     })
  //     .catch(e => {
  //       console.warn(e);
  //     });
  // }

  const [image, setImage] = useState<any>();
  const [comment, setComment] = useState('');

  const {addPost} = useFeed();
  const {name: nickname, email} = useUser();
  const {uploading} = useEvent();

  const canEdit = () => email != null && email.trim() !== '' && !uploading;

  const [newPost, setNewPost] = useState<PostType>({
    id: Math.random(),
    email,
    nickname,
    image,
    comments: [
      {
        nickname,
        comment,
      },
    ],
  });

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
          const pickedImg = resp.assets !== undefined ? resp.assets[0] : null;
          setImage(pickedImg);
          setNewPost({...newPost, image: pickedImg});
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
          const pickedImg = resp.assets !== undefined ? resp.assets[0] : null;
          setImage(pickedImg);
          setNewPost({...newPost, image: pickedImg});
        }
      },
    );
  };

  const handleCommentChange = (newComment: string) => {
    setComment(newComment);
    setNewPost({...newPost, comments: [{nickname, comment}]});
  };

  const save = () => {
    // addFirestorePost({...newPost, id: null, image: null});
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
            onPress={pickPhoto}
            disabled={!canEdit()}
            style={[styles.button, canEdit() ? {} : styles.btnDisabled]}>
            <Text style={styles.btnText}>Tirar uma foto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={pickImage}
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
