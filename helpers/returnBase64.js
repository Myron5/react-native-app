import * as ImageManipulator from 'expo-image-manipulator';

export const getMimeType = uri => {
  const splitted = uri.split('.');
  const extension = splitted[splitted.length - 1];
  return 'image/' + extension;
};

export const returnBase64 = async uri => {
  if (uri === '') return '';

  const imageData = await ImageManipulator.manipulateAsync(uri, [{ resize: { width: 120, height: 120 } }], { base64: true });

  return 'data:' + getMimeType(uri) + ';base64,' + imageData.base64;
};
