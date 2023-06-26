import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  backgroundImage: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    resizeMode: 'cover',
  },

  lowerBox: {
    position: 'relative',

    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

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

  mainTitle: {
    marginTop: 32,

    fontFamily: 'Roboto-Medium',
    fontWeight: 500,
    fontSize: 30,
    textAlign: 'center',
  },

  mainTitleRegist: {
    marginTop: 92,

    fontFamily: 'Roboto-Medium',
    fontWeight: 500,
    fontSize: 30,
    textAlign: 'center',
  },

  form: (dimensions, isKeyboardShown) => ({
    marginTop: 32,
    marginHorizontal: dimensions.marginHorizontal,
    marginBottom: isKeyboardShown ? dimensions.mBotIsKeyboard : 0,
  }),

  passwordBox: {
    position: 'relative',
  },

  input: (focused, value) => ({
    marginTop: value === 1 ? 0 : 16,
    paddingLeft: 16,
    paddingRight: 100,
    height: 50,

    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',

    backgroundColor: focused === value ? '#fff' : '#f6f6f6',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: focused === value ? '#ff6c00' : '#e8e8e8',
    borderRadius: 8,
  }),

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

  togglePasswordTxt: {
    position: 'absolute',
    top: '50%',
    left: '100%',
    transform: [{ translateX: -88 }, { translateY: -3 }],

    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#1b4371',
  },

  button: {
    height: 50,

    paddingVertical: 16,
    marginTop: 45,

    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ff6c00',
    borderRadius: 100,

    ...Platform.select({
      ios: {
        backgroundColor: 'transparent',
      },
      android: {
        backgroundColor: '#ff6c00',
      },
    }),
  },

  buttonText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: Platform.OS == 'ios' ? '#ff6c00' : '#fff',
  },

  additionalTextReg: {
    marginTop: 16,
    marginBottom: 45,

    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#1b4371',
  },

  additionalText: {
    marginTop: 16,
    marginBottom: 110,

    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#1b4371',
  },

  url: {
    textDecorationLine: 'underline',
  },
});
