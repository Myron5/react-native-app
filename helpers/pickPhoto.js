import * as ImagePicker from "expo-image-picker";
import { showToast } from "../Components";

export const pickPhoto = async () => {
  try {
    const data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (data.canceled) {
      showToast("Скасовано");
      return;
    } else if (data.assets[0].fileSize > 5242880) {
      showToast("Розмір файлу занадто великий");
      return;
    }

    return data.assets[0].uri;
  } catch (err) {
    console.log("Error picking file : ", err.message);
  }
};
