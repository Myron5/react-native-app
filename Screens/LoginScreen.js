import React, { useState, useEffect } from 'react';
import { Text, Keyboard, Dimensions, StyleSheet } from 'react-native';

import { FormContainer, LoginForm, FormLink } from '../Components';

export const LoginScreen = () => {
  const [dimensions, setDimensions] = useState({});
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);

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

    const onKeyboardHideAction = () => {
      setIsKeyboardShown(false);
    };

    const onKeyboardShowAction = () => {
      setIsKeyboardShown(true);
    };

    const resizeRubscription = Dimensions.addEventListener('change', onResizeAction);
    const keyboardHideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardHideAction);
    const keyboardShowSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardShowAction);

    onResizeAction();

    return () => {
      resizeRubscription?.remove();
      keyboardShowSubscription?.remove();
      keyboardHideSubscription?.remove();
    };
  }, []);

  return (
    <FormContainer>
      <Text style={styles.mainTitle}>Увійти</Text>

      <LoginForm dimensions={dimensions} isKeyboardShown={isKeyboardShown} />

      <FormLink text={'Немає акаунту?'} linkText={'Зареєструватися'} navigateTo={'Registration'} bottom={110} />
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    marginTop: 32,

    fontFamily: 'Roboto-Medium',
    fontWeight: 500,
    fontSize: 30,
    textAlign: 'center',
  },
});
