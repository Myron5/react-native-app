import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export const ButtonForm = ({ text, handleOnSubmit }) => {
  return (
    <TouchableOpacity onPress={handleOnSubmit} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});
