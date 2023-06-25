import React, { useState, useEffect } from "react";
import {
  StyleSheet,
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
} from "react-native";
import { OpenURLButton } from "../Components";
import { pickPhoto } from "../helpers/pickPhoto";
import { returnBase64 } from "../helpers/returnBase64";

const initialState = {
  photoURI: "",
  login: "",
  email: "",
  password: "",
};

export default RegistrationScreen = () => {
  const [state, setState] = useState(initialState);
  const [isSecure, setIsSecure] = useState(true);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  const [dimensions, setDimensions] = useState({});

  const handleOnUserLoad = async () => {
    const photoURI = await pickPhoto();
    if (!photoURI) return;
    setState((prevState) => ({ ...prevState, photoURI }));
  };

  const handleonUserCancel = () => {
    setState((prevState) => ({ ...prevState, photoURI: "" }));
  };

  const keyboardHide = () => {
    setIsKeyboardShown(false);
    Keyboard.dismiss();
  };

  const handleOnSubmit = async () => {
    keyboardHide();
    const image = await returnBase64(photoURI);
    console.log("IMAGE : ", image);
    console.log("STATE : ", state);
    setState(initialState);
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      const height = Dimensions.get("window").height;

      const verticalState = height > width;

      if (verticalState) {
        setDimensions(() => ({
          mBotIsKeyboard: 8,
          mBotNoKeyboard: 50,
          marginHorizontal: 16,
        }));
      } else {
        setDimensions(() => ({
          mBotIsKeyboard: 4,
          mBotNoKeyboard: 8,
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
            <TouchableOpacity
              onPress={handleOnUserLoad}
              style={styles.fileInput}
              activeOpacity={1}
            >
              {state.photoURI ? (
                <>
                  <Image
                    source={{ uri: state.photoURI }}
                    style={styles.userImage}
                  />
                  <TouchableOpacity
                    onPress={handleonUserCancel}
                    style={styles.addCloseBtn}
                  >
                    <Image
                      source={require("../assets/close.png")}
                      style={styles.addCloseImage}
                    />
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  onPress={handleOnUserLoad}
                  style={styles.addCloseBtn}
                >
                  <Image
                    source={require("../assets/add.png")}
                    style={styles.addCloseImage}
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>

            <Text style={styles.mainTitle}>Реєстрація</Text>

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
                    value={state.login}
                    onChangeText={(login) =>
                      setState((prevState) => ({ ...prevState, login }))
                    }
                    onFocus={() => setIsKeyboardShown(true)}
                    style={{ ...styles.input, marginTop: 0 }}
                    placeholder={"Логін"}
                  />
                </View>

                <View>
                  <TextInput
                    value={state.email}
                    onChangeText={(email) =>
                      setState((prevState) => ({ ...prevState, email }))
                    }
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
                      setState((prevState) => ({ ...prevState, password }))
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
              Вже є акаунт?
              <OpenURLButton url={"https://google.com"}>Увійти</OpenURLButton>
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
    position: "relative",

    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  fileInput: {
    position: "absolute",
    top: "0%",
    left: "50%",
    transform: [{ translateX: -60 }, { translateY: -60 }],

    width: 120,
    height: 120,

    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },

  userImage: {
    width: 120,
    height: 120,

    borderRadius: 16,
  },

  addCloseBtn: {
    position: "absolute",
    top: "100%",
    left: "100%",
    transform: [{ translateX: -15 }, { translateY: -38 }],
  },

  addCloseImage: {
    width: 25,
    height: 25,
  },

  mainTitle: {
    marginTop: 92,

    fontFamily: "Roboto-Medium",
    fontWeight: 500,
    fontSize: 30,
    textAlign: "center",
  },

  form: {
    marginTop: 32,
  },

  passwordBox: {
    position: "relative",
  },

  input: {
    marginTop: 16,
    paddingLeft: 16,
    paddingRight: 100,
    height: 50,

    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#bdbdbd",

    backgroundColor: "#f6f6f6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#e8e8e8",
    borderRadius: 8,
  },

  togglePasswordTxt: {
    position: "absolute",
    top: "50%",
    left: "100%",
    transform: [{ translateX: -88 }, { translateY: -3 }],

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
});
