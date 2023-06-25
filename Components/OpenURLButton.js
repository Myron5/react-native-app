import { useCallback } from "react";
import { Text, Linking, Alert, StyleSheet } from "react-native";

export const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <>
      {" "}
      <Text onPress={handlePress} style={styles.url}>
        {children}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  url: {
    textDecorationLine: "underline",
  },
});
