import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './Button.style';

const Button = ({title, onPress, theme = 'primary'}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles[theme].button}>
      <Text style={styles[theme].text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
