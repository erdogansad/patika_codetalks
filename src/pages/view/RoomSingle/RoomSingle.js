import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './RoomSingle.style';
import MessageCard from './components/MessageCard';
import NewButton from '../../../components/NewButton';
import NewMessageModal from './components/modals/NewMessageModal';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

const RoomSingle = ({route, navigation}) => {
  const {room} = route.params;
  const [messages, setMessages] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);

  const LogoutButton = ({onPress}) => (
    <TouchableOpacity onPress={onPress}>
      <Icon name="exit" size={30} color="orange" />
    </TouchableOpacity>
  );
  const leaveRoomHandler = () => {
    const user = auth().currentUser;
    navigation.goBack();
    database().ref(`/rooms/${room.id}/users/${user.uid}`).remove();
  };

  useEffect(() => {
    const onValueChange = database()
      .ref(`/rooms/${room.id}/messages`)
      .on('value', snapshot => {
        let data = snapshot.val();
        let list = data ? Object.keys(data) : [];
        list = list
          .map(key => ({...data[key], id: key}))
          .sort((a, b) => new Date(b.date) - new Date(a.date));
        setMessages(list);
      });
    return () =>
      database().ref(`/rooms/${room.id}/messages`).off('value', onValueChange);
  }, [room]);

  useEffect(() => {
    navigation.setOptions({
      title: room.name,
      headerRight: () => <LogoutButton onPress={leaveRoomHandler} />,
    });
  }, [navigation, room]);

  return (
    <View style={styles.container}>
      <NewMessageModal
        room={room}
        visible={visibleModal}
        setVisible={setVisibleModal}
      />
      {messages.length === 0 && (
        <Text style={styles.null_message}>{room.name} odası kuruldu!</Text>
      )}
      <FlatList
        contentContainerStyle={styles.list}
        data={messages}
        renderItem={({item}) => <MessageCard message={item} />}
      />
      <NewButton onPress={() => setVisibleModal(true)} />
    </View>
  );
};

export default RoomSingle;
