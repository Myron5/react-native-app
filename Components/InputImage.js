import { Image, TouchableOpacity, StyleSheet } from 'react-native';

export const InputImage = ({ uri, handleOnUserLoad, handleonUserCancel }) => {
  return (
    <TouchableOpacity onPress={handleOnUserLoad} style={styles.fileInput} activeOpacity={1}>
      {uri ? (
        <>
          <Image source={{ uri }} style={styles.userImage} />
          <TouchableOpacity onPress={handleonUserCancel} style={styles.addCloseBtn}>
            <Image source={require('../assets/close.png')} style={styles.addCloseImage} />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={handleOnUserLoad} style={styles.addCloseBtn}>
            <Image source={require('../assets/add.png')} style={styles.addCloseImage} />
          </TouchableOpacity>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fileInput: {
    position: 'absolute',
    top: '0%',
    left: '50%',
    transform: [{ translateX: -60 }, { translateY: -60 }],

    width: 120,
    height: 120,

    backgroundColor: '#f6f6f6',
    borderRadius: 16,
  },

  userImage: {
    width: 120,
    height: 120,

    borderRadius: 16,
  },

  addCloseBtn: {
    position: 'absolute',
    top: '100%',
    left: '100%',
    transform: [{ translateX: -15 }, { translateY: -38 }],
  },

  addCloseImage: {
    width: 25,
    height: 25,
  },
});
