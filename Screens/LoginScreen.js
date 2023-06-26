import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Dimensions,
} from 'react-native';

import { OpenURLButton } from '../Components';
import { styles } from '../Styles/LoginRegistration';

const initialState = {
  email: '',
  password: '',
};

export const LoginScreen = () => {
  const [state, setState] = useState(initialState);
  const [isSecure, setIsSecure] = useState(true);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [dimensions, setDimensions] = useState({});
  const [focused, setFocused] = useState(null);

  const handleOnSubmit = () => {
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  const handleOnFocusInput = inputNumber => {
    return () => {
      setFocused(inputNumber);
    };
  };

  const handleOnBlurInput = () => {
    setFocused(null);
  };

  const toggleSecure = () => {
    setIsSecure(toggle => !toggle);
  };

  useEffect(() => {
    const onResizeAction = () => {
      const width = Dimensions.get('window').width;
      const height = Dimensions.get('window').height;

      const verticalState = height > width;

      if (verticalState) {
        setDimensions(() => ({
          vertical: true,
          mBotIsKeyboard: 30,
          marginHorizontal: 16,
        }));
      } else {
        setDimensions(() => ({
          vertical: false,
          mBotIsKeyboard: 16,
          marginHorizontal: 32,
        }));
      }
    };
    onResizeAction();

    const onKeyboardHideAction = () => {
      setIsKeyboardShown(false);
    };

    const onKeyboardShowAction = () => {
      setIsKeyboardShown(true);
    };

    const resizeRubscription = Dimensions.addEventListener('change', onResizeAction);
    const keyboardHideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardHideAction);
    const keyboardShowSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardShowAction);

    return () => {
      resizeRubscription?.remove();
      keyboardShowSubscription?.remove();
      keyboardHideSubscription?.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground source={require('../assets/background-main.jpg')} style={styles.backgroundImage}>
          <View style={styles.lowerBox}>
            <Text style={styles.mainTitle}>Увійти</Text>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View style={styles.form(dimensions, isKeyboardShown)}>
                <View>
                  <TextInput
                    value={state.email}
                    onChangeText={email => setState({ ...state, email })}
                    onFocus={handleOnFocusInput(1)}
                    onBlur={handleOnBlurInput}
                    style={styles.input(focused, 1)}
                    placeholder={'Адреса електронної пошти'}
                  />
                </View>

                <View style={styles.passwordBox}>
                  <TextInput
                    value={state.password}
                    maxLength={32}
                    onChangeText={password => setState({ ...state, password })}
                    onFocus={handleOnFocusInput(2)}
                    onBlur={handleOnBlurInput}
                    style={styles.input(focused, 2)}
                    placeholder={'Пароль'}
                    secureTextEntry={isSecure}
                  />

                  <Text onPress={toggleSecure} style={styles.togglePasswordTxt}>
                    Показати
                  </Text>
                </View>

                <TouchableOpacity onPress={handleOnSubmit} style={styles.button}>
                  <Text style={styles.buttonText}>Увійти</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>

            <Text style={styles.additionalText}>
              Немає акаунту?
              <OpenURLButton url={'https://google.com'}>Зареєструватися</OpenURLButton>
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
