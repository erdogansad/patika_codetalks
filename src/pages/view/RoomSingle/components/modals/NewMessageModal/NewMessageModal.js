import {View, TextInput} from 'react-native';
import React from 'react';
import Button from '../../../../../../components/Button';
import Modal from 'react-native-modal';
import styles from './NewMessageModal.style';
import {Controller, useForm} from 'react-hook-form';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';

const NewMessageModal = ({room, visible, setVisible}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    const user = auth().currentUser;
    database()
      .ref(`/rooms/${room.id}/messages`)
      .push({
        date: new Date().toISOString(),
        message: data.message,
        sender: user.email.split('@')[0],
      })
      .then(() => {
        setVisible(false);
        reset();
        showMessage({
          message: 'Mesaj gönderildi.',
          type: 'success',
        });
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
          name="message"
          control={control}
          defaultValue=""
          rules={{required: 'Bir mesaj girmelisiniz'}}
          render={({field: {onChange, value}}) => (
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              value={value}
              placeholder="Mesajınızı giriniz"
            />
          )}
        />
        <Button title="Ekle" onPress={handleSubmit(onSubmit)} />
      </View>
    </Modal>
  );
};

export default NewMessageModal;
