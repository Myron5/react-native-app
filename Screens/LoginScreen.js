import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Alert,
  Linking,
  Dimensions,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

const OpenURLButton = ({ url, children }) => {
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

export default LoginScreen = () => {
  const [state, setState] = useState(initialState);
  const [isSecure, setIsSecure] = useState(true);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [dimensions, setDimensions] = useState({});

  const keyboardHide = () => {
    setIsKeyboardShown(false);
    Keyboard.dismiss();
  };

  const handleOnSubmit = () => {
    keyboardHide();
    console.log(state);
    setState(initialState);
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      const height = Dimensions.get("window").height;

      const verticalState = height > width;

      if (verticalState) {
        setDimensions(() => ({
          mBotIsKeyboard: 32,
          mBotNoKeyboard: 110,
          marginHorizontal: 16,
        }));
      } else {
        setDimensions(() => ({
          mBotIsKeyboard: 8,
          mBotNoKeyboard: 16,
          marginHorizontal: 32,
        }));
      }
    };

    onChange();
    const subscription = Dimensions.addEventListener("change", onChange);

    return () => subscription?.remove();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/background-main.jpg")}
          style={styles.backgroundImage}
        >
          <View style={styles.lowerBox}>
            <Text style={styles.mainTitle}>Увійти</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <View
                style={{
                  ...styles.form,
                  marginHorizontal: dimensions.marginHorizontal,
                }}
              >
                <View>
                  <TextInput
                    value={state.email}
                    onChangeText={(email) => setState({ ...state, email })}
                    onFocus={() => setIsKeyboardShown(true)}
                    style={styles.input}
                    placeholder={"Адреса електронної пошти"}
                  />
                </View>

                <View style={styles.passwordBox}>
                  <TextInput
                    value={state.password}
                    maxLength={32}
                    onChangeText={(password) =>
                      setState({ ...state, password })
                    }
                    onFocus={() => setIsKeyboardShown(true)}
                    style={styles.input}
                    placeholder={"Пароль"}
                    secureTextEntry={isSecure}
                  />

                  <Text
                    onPress={() => setIsSecure((toggle) => !toggle)}
                    style={styles.togglePasswordTxt}
                  >
                    Показати
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={handleOnSubmit}
                  style={styles.button}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonText}>Увійти</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
            <Text
              style={{
                ...styles.additionalText,
                marginBottom: isKeyboardShown
                  ? dimensions.mBotIsKeyboard
                  : dimensions.mBotNoKeyboard,
              }}
            >
              Немає акаунту?
              <OpenURLButton url={"https://google.com"}>
                Зареєструватися
              </OpenURLButton>
            </Text>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  backgroundImage: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    resizeMode: "cover",
  },

  lowerBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  mainTitle: {
    marginTop: 32,

    fontFamily: "Roboto-Medium",
    fontWeight: 500,
    fontSize: 30,
    textAlign: "center",
  },

  form: {
    marginTop: 32,
  },

  passwordBox: {
    marginTop: 16,
    position: "relative",
  },

  input: {
    paddingLeft: 16,
    paddingRight: 100,
    height: 50,

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#bdbdbd",

    backgroundColor: "#f6f6f6",
    borderColor: "#e8e8e8",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 8,
  },

  togglePasswordTxt: {
    position: "absolute",
    top: "50%",
    left: "100%",
    transform: [{ translateX: -88 }, { translateY: -10 }],

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#1b4371",
  },

  button: {
    height: 50,
    marginTop: 45,
    paddingTop: 16,
    paddingBottom: 16,

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ff6c00",
    borderRadius: 100,

    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
      },
      android: {
        backgroundColor: "#ff6c00",
      },
    }),
  },

  buttonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: Platform.OS == "ios" ? "#ff6c00" : "#fff",
  },

  additionalText: {
    marginTop: 32,

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1b4371",
  },

  url: {
    textDecorationLine: "underline",
  },
});
