import { PermissionsAndroid } from 'react-native';

class Permissions {
  getCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Permissão da Câmera',
          message:
            'Musicando App precisa de permissão para que você possa tirar fotos incríveis.',
          buttonNeutral: 'Pergunte mais tarde',
          buttonNegative: 'Cancelar',
          buttonPositive: 'Ok',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (e) {
      //TODO(Jeconias) Solve it.
      return e;
    }
  };
}

export default new Permissions();
