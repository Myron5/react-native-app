import { useCallback } from 'react';
import { Text, Linking, StyleSheet } from 'react-native';
import { showToast } from './';

export const UrlLink = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      showToast(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <>
      {' '}
      <Text onPress={handlePress} style={styles.url}>
        {children}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  url: {
    textDecorationLine: 'underline',
  },
});
