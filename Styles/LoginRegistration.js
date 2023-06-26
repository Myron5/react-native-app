import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  fileInput: {
    position: 'absolute',
    top: '0%',
    left: '50%',
    transform: [{ translateX: -60 }, { translateY: -60 }],

    width: 120,
    height: 120,

    backgroundColor: '#f6f6f6',
    borderRadius: 16,
  },

  userImage: {
    width: 120,
    height: 120,

    borderRadius: 16,
  },

  addCloseBtn: {
    position: 'absolute',
    top: '100%',
    left: '100%',
    transform: [{ translateX: -15 }, { translateY: -38 }],
  },

  addCloseImage: {
    width: 25,
    height: 25,
  },

  mainTitleRegist: {
    marginTop: 92,

    fontFamily: 'Roboto-Medium',
    fontWeight: 500,
    fontSize: 30,
    textAlign: 'center',
  },

  togglePasswordTxtReg: {
    position: 'absolute',
    top: '50%',
    left: '100%',
    transform: [{ translateX: -88 }, { translateY: -10 }],

    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#1b4371',
  },
});
