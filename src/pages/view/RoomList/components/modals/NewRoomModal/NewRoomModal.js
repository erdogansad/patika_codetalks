import {View, TextInput} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import styles from './NewRoomModal.style';
import Button from '../../../../../../components/Button';
import database from '@react-native-firebase/database';
import {Controller, useForm} from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

const NewRoomModal = ({visible, setVisible}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    const user = auth().currentUser;
    database()
      .ref('/rooms')
      .once('value')
      .then(snapshot => {
        let roomList = snapshot.val();
        let list = roomList ? Object.keys(roomList) : [];
        list = list
          .map(key => ({...roomList[key], id: key}))
          .filter(room => data.room_name === room.name);
        if (list.length > 0) {
          let userList = list[0].users ? Object.keys(list[0].users) : [];
          if (userList.includes(user.uid)) {
            setVisible(false);
            reset();
            showMessage({
              message: 'Oda zaten var.',
              type: 'danger',
            });
          } else {
            database()
              .ref(`/rooms/${list[0].id}/users/${user.uid}`)
              .set(user.email.split('@')[0])
              .then(() => {
                setVisible(false);
                reset();
                showMessage({
                  message: 'Odaya başarıyla katıldınız.',
                  type: 'success',
                });
              });
          }
        } else {
          database()
            .ref('/rooms')
            .push({
              name: data.room_name,
              users: {[user.uid]: user.email.split('@')[0]},
            })
            .then(() => {
              setVisible(false);
              reset();
              showMessage({
                message: 'Oda başarıyla oluşturuldu.',
                type: 'success',
              });
            });
        }
      });
  };

  return (
    <Modal
      isVisible={visible}
      swipeDirection={['down']}
      onSwipeComplete={() => setVisible(false)}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
      style={styles.modal}>
      <View style={styles.container}>
        <Controller
          control={control}
          name="room_name"
          rules={{
            required: {
              value: true,
              message: 'Oda adı boş bırakılamaz.',
            },
            max: {
              value: 10,
              message: 'Oda adı en fazla 10 karakter olmalıdır.',
            },
            minLength: {
              value: 3,
              message: 'Oda adı en az 3 karakter olmalıdır.',
            },
            pattern: /^[A-Za-z]+$/,
          }}
          render={({field: {onChange, value}}) => (
            <TextInput
              onChangeText={onChange}
              value={value}
              placeholder="Oda adı.."
              multiline
              style={styles.input}
            />
          )}
        />
        <Button title="Ekle" onPress={handleSubmit(onSubmit)} />
      </View>
    </Modal>
  );
};

export default NewRoomModal;
