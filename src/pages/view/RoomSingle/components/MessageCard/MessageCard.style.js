import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    gap: 10,
  },
  message_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sender: {
    fontSize: 16,
  },
  date: {
    fontStyle: 'italic',
  },
  message: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
