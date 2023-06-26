import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'Roboto-Regular': require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
    'Roboto-Medium': require('../assets/fonts/Roboto/Roboto-Medium.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
  });
};
