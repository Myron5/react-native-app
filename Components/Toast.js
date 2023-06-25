import Toast from "react-native-root-toast";

export const showToast = (message) => {
  Toast.show(message, {
    duration: Toast.durations.SHORT,
    position: 50,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    // onShow: () => {
    //   // calls on toast\`s appear animation start
    // },
    // onShown: () => {
    //   // calls on toast\`s appear animation end.
    // },
    // onHide: () => {
    //   // calls on toast\`s hide animation start.
    // },
    // onHidden: () => {
    //   // calls on toast\`s hide animation end.
    // },
  });
};
