import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './RoomCard.style';

const RoomCard = ({room, handleRoom}) => {
  return (
    <TouchableOpacity onPress={() => handleRoom(room)} style={styles.card}>
      <Text style={styles.card_text}>{room.name}</Text>
    </TouchableOpacity>
  );
};

export default RoomCard;
