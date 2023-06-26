import { cacheDirectory, getInfoAsync, makeDirectoryAsync, copyAsync } from 'expo-file-system';

export const createCacheFile = async ({ name, uri }) => {
  const info = await getInfoAsync(cacheDirectory + 'uploads/');
  if (!info.exists) {
    await makeDirectoryAsync(cacheDirectory + 'uploads/');
  }

  const cacheFilePath = cacheDirectory + 'uploads/' + name;
  await copyAsync({ from: uri, to: cacheFilePath });

  return cacheFilePath;
};

// Example with code

// const photo = await DocumentPicker.getDocumentAsync({
//   type: ["image/*"],
//   copyToCacheDirectory: false,
// });

// photo.uri = await createCacheFile(photo);
