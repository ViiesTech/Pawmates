import Toast from 'react-native-toast-message';

export const ShowToast = (type, text1) => {
    Toast.show({
        type: type,
        text1: text1,
    });
}

export default ShowToast