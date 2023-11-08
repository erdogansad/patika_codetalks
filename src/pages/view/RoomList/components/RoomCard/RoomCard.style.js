import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../../../../styles/colors';

export default StyleSheet.create({
  card: {
    aspectRatio: 1,
    width: Dimensions.get('window').width / 2 - 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card_text: {
    fontSize: 25,
    color: colors.primary,
  },
});
