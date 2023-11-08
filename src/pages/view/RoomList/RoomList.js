import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import RoomCard from './components/RoomCard';
import styles from './RoomList.style';
import NewButton from '../../../components/NewButton';
import NewRoomModal from './components/modals/NewRoomModal';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

const RoomList = ({navigation}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const user = auth().currentUser;
    const onValueChange = database()
      .ref('/rooms')
      .on('value', snapshot => {
        let data = snapshot.val();
        let list = data ? Object.keys(data) : [];
        list = list
          .map(key => ({...data[key], id: key}))
          .filter(room => room && room.users && room.users[user.uid])
          .sort((a, b) => a.name.localeCompare(b.name));
        setRooms(list);
      });
    return () => database().ref('/rooms').off('value', onValueChange);
  }, []);

  const handleRoomPress = room => {
    navigation.navigate('RoomSingle', {room});
  };

  return (
    <View style={styles.container}>
      <NewRoomModal visible={visibleModal} setVisible={setVisibleModal} />
      <FlatList
        contentContainerStyle={styles.list}
        numColumns={2}
        columnWrapperStyle={styles.list_wrapper}
        data={rooms}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <RoomCard room={item} handleRoom={handleRoomPress} />
        )}
      />
      <NewButton onPress={() => setVisibleModal(true)} />
    </View>
  );
};

export default RoomList;
