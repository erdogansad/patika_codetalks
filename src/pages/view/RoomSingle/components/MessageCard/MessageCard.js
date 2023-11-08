import {View, Text} from 'react-native';
import React from 'react';
import styles from './MessageCard.style';
import {formatDistanceToNow} from 'date-fns';
import {tr} from 'date-fns/locale';
const MessageCard = ({message}) => {
  return (
    <View style={styles.card}>
      <View style={styles.message_container}>
        <Text style={styles.sender}>{message.sender}</Text>
        <Text style={styles.date}>
          {formatDistanceToNow(new Date(message.date), {
            addSuffix: true,
            locale: tr,
          })}
        </Text>
      </View>
      <Text style={styles.message}>{message.message}</Text>
    </View>
  );
};

export default MessageCard;
