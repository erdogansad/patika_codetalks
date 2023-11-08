import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './NewButton.style';
import Icon from 'react-native-vector-icons/Ionicons';

const NewButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>
        <Icon name="add-outline" size={36} color="white" />
      </Text>
    </TouchableOpacity>
  );
};

export default NewButton;
