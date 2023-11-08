import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

const base = StyleSheet.create({
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    fontSize: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default {
  primary: StyleSheet.create({
    ...base,
    button: {
      ...base.button,
      backgroundColor: colors.primary,
    },
    text: {
      ...base.text,
      color: colors.secondary,
    },
  }),
  secondary: StyleSheet.create({
    ...base,
    button: {
      ...base.button,
      backgroundColor: colors.secondary,
    },
    text: {
      ...base.text,
      color: colors.primary,
    },
  }),
};
