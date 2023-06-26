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
import { useNavigation } from '@react-navigation/native';

import { styles } from '../Styles/LoginRegistration';

const initialState = {
  email: '',
  password: '',
};

export const LoginScreen = () => {
  const [state, setState] = useState(initialState);
  const navigation = useNavigation();

  const [isSecure, setIsSecure] = useState(true);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [dimensions, setDimensions] = useState({});
  const [focused, setFocused] = useState(null);

  const handleOnSubmit = () => {
    return () => {
      Keyboard.dismiss();
      console.log(state);
      setState(initialState);
    };
  };

  const handleOnChangeText = key => {
    return value => setState(prevState => ({ ...prevState, [key]: value }));
  };

  const handleOnFocusInput = inputNumber => {
    return () => {
      setFocused(inputNumber);
    };
  };

  const handleOnBlurInput = () => {
    return () => {
      setFocused(null);
    };
  };

  const toggleSecure = () => {
    return () => {
      setIsSecure(toggle => !toggle);
    };
  };

  const goToRegister = () => {
    return () => {
      navigation.navigate('Registration');
    };
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
                    onChangeText={handleOnChangeText('email')}
                    onFocus={handleOnFocusInput(1)}
                    onBlur={handleOnBlurInput()}
                    style={styles.input(focused, 1)}
                    placeholder={'Адреса електронної пошти'}
                  />
                </View>

                <View style={styles.passwordBox}>
                  <TextInput
                    value={state.password}
                    maxLength={32}
                    onChangeText={handleOnChangeText('password')}
                    onFocus={handleOnFocusInput(2)}
                    onBlur={handleOnBlurInput()}
                    style={styles.input(focused, 2)}
                    placeholder={'Пароль'}
                    secureTextEntry={isSecure}
                  />

                  <Text onPress={toggleSecure()} style={styles.togglePasswordTxt}>
                    Показати
                  </Text>
                </View>

                <TouchableOpacity onPress={handleOnSubmit()} style={styles.button}>
                  <Text style={styles.buttonText}>Увійти</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>

            <Text style={styles.additionalText}>
              Немає акаунту?
              <TouchableOpacity onPress={goToRegister()}>
                <Text style={styles.url}>Зареєструватися</Text>
              </TouchableOpacity>
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
