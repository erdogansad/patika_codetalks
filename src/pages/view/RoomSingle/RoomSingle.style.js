import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 10,
  },
  null_message: {
    color: 'white',
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    borderStyle: 'dashed',
    textAlign: 'center',
    borderRadius: 10,
  },
  list: {
    padding: 10,
    gap: 10,
  },
});
