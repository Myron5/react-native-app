import { View, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';

export const InputEmail = ({ handleOnChangeText, position, value }) => {
  const [focused, setFocused] = useState(false);

  const handleOnFocusInput = () => {
    setFocused(true);
  };

  const handleOnBlurInput = () => {
    setFocused(false);
  };

  return (
    <View>
      <TextInput
        onChangeText={handleOnChangeText}
        onFocus={handleOnFocusInput}
        onBlur={handleOnBlurInput}
        value={value}
        placeholder={'Адреса електронної пошти'}
        style={styles.input(focused, position)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});
