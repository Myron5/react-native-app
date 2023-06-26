import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';

export const InputPassword = ({ handleOnChangeText, position, value }) => {
  const [focused, setFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(true);

  const handleOnFocusInput = () => {
    setFocused(true);
  };

  const handleOnBlurInput = () => {
    setFocused(false);
  };

  const toggleSecure = () => {
    setIsSecure(toggle => !toggle);
  };

  return (
    <View style={styles.passwordBox}>
      <TextInput
        maxLength={32}
        onChangeText={handleOnChangeText}
        onFocus={handleOnFocusInput}
        onBlur={handleOnBlurInput}
        value={value}
        placeholder={'Пароль'}
        style={styles.input(focused, position)}
        secureTextEntry={isSecure}
      />

      <Text onPress={toggleSecure} style={styles.togglePasswordTxt}>
        Показати
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  passwordBox: {
    position: 'relative',
  },

  input: (focused, posotion) => ({
    marginTop: posotion === 1 ? 0 : 16,
    paddingLeft: 16,
    paddingRight: 100,
    height: 50,

    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#212121',

    backgroundColor: focused ? '#fff' : '#f6f6f6',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: focused ? '#ff6c00' : '#e8e8e8',
    borderRadius: 8,
  }),

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
});
