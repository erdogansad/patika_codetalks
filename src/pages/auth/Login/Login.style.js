import {StyleSheet} from 'react-native';
import colors from '../../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
  },
  logo_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo_text: {
    fontSize: 30,
    color: 'white',
  },
  inputs_container: {
    flex: 1,
  },
  input: {
    borderColor: 'white',
    borderBottomWidth: 1,
    color: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
});
