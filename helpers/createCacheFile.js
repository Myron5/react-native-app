import * as FileSystem from "expo-file-system";

// const photo = await DocumentPicker.getDocumentAsync({
//   type: ["image/*"],
//   copyToCacheDirectory: false,
// });

// photo.uri = await createCacheFile(photo);

export const createCacheFile = async ({ name, uri }) => {
  if (
    !(await FileSystem.getInfoAsync(FileSystem.cacheDirectory + "uploads/"))
      .exists
  ) {
    await FileSystem.makeDirectoryAsync(FileSystem.cacheDirectory + "uploads/");
  }

  const cacheFilePath = FileSystem.cacheDirectory + "uploads/" + name;
  await FileSystem.copyAsync({ from: uri, to: cacheFilePath });
  return cacheFilePath;
};
