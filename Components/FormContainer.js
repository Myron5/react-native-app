import { View, ImageBackground, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';

export const FormContainer = ({ children }) => {
  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={hideKeyboard}>
      <View style={styles.container}>
        <ImageBackground source={require('../assets/background-main.jpg')} style={styles.backgroundImage}>
          <View style={styles.lowerBox}>{children}</View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
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
});
