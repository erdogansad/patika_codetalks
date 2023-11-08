import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

export default StyleSheet.create({
  button: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    backgroundColor: colors.main,
    borderRadius: 100,
  },
  text: {},
});
