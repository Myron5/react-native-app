import { Asset } from 'expo-asset';

export const _cacheResourcesAsync = async () => {
  const images = [require('../assets/background-main.jpg'), require('../assets/add.png'), require('../assets/close.png')];

  const cacheImages = images.map(image => {
    return Asset.fromModule(image).downloadAsync();
  });

  return Promise.all(cacheImages);
};
