import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  wrapper: {
    marginHorizontal: 10,
  },

  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#747474',
  },
  text: {
    color: '#747474',
  },
  thumbnail: {
    height: 100,
    width: 100,
    flex: 1,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
});
