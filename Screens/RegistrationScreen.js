import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
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
import { pickPhoto } from '../helpers/pickPhoto';
import { returnBase64 } from '../helpers/returnBase64';
import { styles } from '../Styles/LoginRegistration';

const initialState = {
  photoURI: '',
  login: '',
  email: '',
  password: '',
};

export const RegistrationScreen = () => {
  const [state, setState] = useState(initialState);
  const [isSecure, setIsSecure] = useState(true);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [dimensions, setDimensions] = useState({});
  const [focused, setFocused] = useState(null);

  const handleOnSubmit = () => {
    return async () => {
      Keyboard.dismiss();
      const image = await returnBase64(photoURI);
      console.log('IMAGE : ', image);
      console.log('STATE : ', state);
      setState(initialState);
    };
  };

  const handleOnChangeText = key => {
    return value => setState(prevState => ({ ...prevState, [key]: value }));
  };

  const handleOnUserLoad = () => {
    return async () => {
      const photoURI = await pickPhoto();
      if (!photoURI) return;
      setState(prevState => ({ ...prevState, photoURI }));
    };
  };

  const handleonUserCancel = () => {
    return () => {
      setState(prevState => ({ ...prevState, photoURI: '' }));
    };
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
            <TouchableOpacity onPress={handleOnUserLoad()} style={styles.fileInput} activeOpacity={1}>
              {state.photoURI ? (
                <>
                  <Image source={{ uri: state.photoURI }} style={styles.userImage} />
                  <TouchableOpacity onPress={handleonUserCancel()} style={styles.addCloseBtn}>
                    <Image source={require('../assets/close.png')} style={styles.addCloseImage} />
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity onPress={handleOnUserLoad()} style={styles.addCloseBtn}>
                  <Image source={require('../assets/add.png')} style={styles.addCloseImage} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>

            <Text style={styles.mainTitleRegist}>Реєстрація</Text>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <View style={styles.form(dimensions, isKeyboardShown)}>
                <View>
                  <TextInput
                    value={state.login}
                    onChangeText={handleOnChangeText('login')}
                    onFocus={handleOnFocusInput(1)}
                    onBlur={handleOnBlurInput()}
                    style={styles.input(focused, 1)}
                    placeholder={'Логін'}
                  />
                </View>

                <View>
                  <TextInput
                    value={state.email}
                    onChangeText={handleOnChangeText('email')}
                    onFocus={handleOnFocusInput(2)}
                    onBlur={handleOnBlurInput()}
                    style={styles.input(focused, 2)}
                    placeholder={'Адреса електронної пошти'}
                  />
                </View>

                <View style={styles.passwordBox}>
                  <TextInput
                    value={state.password}
                    maxLength={32}
                    onChangeText={handleOnChangeText('password')}
                    onFocus={handleOnFocusInput(3)}
                    onBlur={handleOnBlurInput()}
                    style={styles.input(focused, 3)}
                    placeholder={'Пароль'}
                    secureTextEntry={isSecure}
                  />

                  <Text onPress={toggleSecure()} style={styles.togglePasswordTxtReg}>
                    Показати
                  </Text>
                </View>

                <TouchableOpacity onPress={handleOnSubmit()} style={styles.button}>
                  <Text style={styles.buttonText}>Увійти</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>

            <Text style={styles.additionalTextReg}>
              Вже є акаунт?
              <OpenURLButton url={'https://google.com'}>Увійти</OpenURLButton>
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
