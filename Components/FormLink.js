import { Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const FormLink = ({ text, linkText, navigateTo, bottom }) => {
  const navigation = useNavigation();

  const handleOnPress = () => {
    navigation.navigate(navigateTo);
  };

  return (
    <Text style={styles.additionalText(bottom)}>
      {text + ' '}
      <Text onPress={handleOnPress} style={styles.url}>
        {linkText}
      </Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  additionalText: bottom => ({
    marginTop: 16,
    marginBottom: bottom,

    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#1b4371',
  }),

  url: {
    textDecorationLine: 'underline',
  },
});
