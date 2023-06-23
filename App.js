import React, { useCallback, useEffect, useState } from "react";

import * as Font from "expo-font";

import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";

import { View, StyleSheet } from "react-native";
import LoginScreen from "./Screens/LoginScreen";

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
  });
};

const _cacheResourcesAsync = async () => {
  const images = [require("./assets/background-main.jpg")];

  const cacheImages = images.map((image) => {
    return Asset.fromModule(image).downloadAsync();
  });

  return Promise.all(cacheImages);
};

const fullLoad = async () => {
  await loadFonts();
  await _cacheResourcesAsync();
};

export default App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await fullLoad();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <LoginScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
