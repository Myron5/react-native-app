import { View, KeyboardAvoidingView, StyleSheet, Keyboard, Platform } from 'react-native';
import React, { useState } from 'react';

import { InputImage, InputLogin, InputEmail, InputPassword, ButtonForm } from './';
import { pickPhoto, returnBase64 } from '../helpers';

const initialState = {
  photoURI: '',
  login: '',
  email: '',
  password: '',
};

export const RegisterForm = ({ dimensions, isKeyboardShown }) => {
  const [state, setState] = useState(initialState);

  const handleOnSubmit = async () => {
    Keyboard.dismiss();
    const image = await returnBase64(state.photoURI);
    console.log('IMAGE : ', image);
    console.log('STATE : ', state);
    setState(initialState);
  };

  const handleOnChangeText = key => {
    return value => setState(prevState => ({ ...prevState, [key]: value }));
  };

  const handleOnUserLoad = async () => {
    const photoURI = await pickPhoto();
    if (!photoURI) return;
    setState(prevState => ({ ...prevState, photoURI }));
  };

  const handleonUserCancel = () => {
    setState(prevState => ({ ...prevState, photoURI: '' }));
  };

  return (
    <>
      <InputImage uri={state.photoURI} handleOnUserLoad={handleOnUserLoad} handleonUserCancel={handleonUserCancel} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.form(dimensions, isKeyboardShown)}>
          <InputLogin handleOnChangeText={handleOnChangeText('login')} position={1} value={state.login} />

          <InputEmail handleOnChangeText={handleOnChangeText('email')} position={2} value={state.email} />

          <InputPassword handleOnChangeText={handleOnChangeText('password')} position={3} value={state.password} />

          <ButtonForm text={'Зареєструватися'} handleOnSubmit={handleOnSubmit} />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  form: (dimensions, isKeyboardShown) => ({
    marginTop: 32,
    marginHorizontal: dimensions.marginHorizontal,
    marginBottom: isKeyboardShown ? dimensions.mBotIsKeyboard : 0,
  }),
});
