import { View, KeyboardAvoidingView, StyleSheet, Keyboard, Platform } from 'react-native';
import React, { useState } from 'react';

import { InputEmail, InputPassword, ButtonForm } from './';

const initialState = {
  email: '',
  password: '',
};

export const LoginForm = ({ dimensions, isKeyboardShown }) => {
  const [state, setState] = useState(initialState);

  const handleOnSubmit = () => {
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  const handleOnChangeText = key => {
    return value => setState(prevState => ({ ...prevState, [key]: value }));
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.form(dimensions, isKeyboardShown)}>
        <InputEmail handleOnChangeText={handleOnChangeText('email')} position={1} value={state.email} />

        <InputPassword handleOnChangeText={handleOnChangeText('password')} position={2} value={state.password} />

        <ButtonForm text={'Увійти'} handleOnSubmit={handleOnSubmit} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: (dimensions, isKeyboardShown) => ({
    marginTop: 32,
    marginHorizontal: dimensions.marginHorizontal,
    marginBottom: isKeyboardShown ? dimensions.mBotIsKeyboard : 0,
  }),
});
