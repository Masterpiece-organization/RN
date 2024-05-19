import {useCallback} from 'react';
import {Linking, Platform} from 'react-native';
import {
  request,
  check,
  PERMISSIONS,
  RESULTS,
  PermissionStatus,
  Permission,
} from 'react-native-permissions';
import showAlert from '@/utils/showAlert';

// const MESSAGES = {
//   UNAVAILABLE:
//     '이 기능을 사용할 수 없습니다. 이 기기에서는 이 권한을 지원하지 않습니다.',
//   DENIED:
//     '권한 요청이 거부되었습니다. 이 기능을 사용하기 위해서는 권한이 필요합니다.',
//   LIMITED: '권한이 제한되었습니다. 일부 기능이 제한될 수 있습니다.',
//   BLOCKED: '권한이 차단되었습니다. 설정에서 이 앱의 권한을 변경해주세요.',
//   ERROR: '알 수 없는 오류가 발생했습니다. 잠시후 다시 시도해주세요.',
// };

const MESSAGES = {
  UNAVAILABLE:
    '이 기능을 사용할 수 없습니다. 이 기기에서는 이 권한을 지원하지 않습니다.',
  ERROR: '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  location: {
    DENIED: '위치 서비스를 사용할 수 없습니다. 위치 서비스를 켜 주세요.',
    LIMITED: '위치 서비스를 사용할 수 없습니다. 위치 서비스를 켜 주세요.',
    BLOCKED: '위치 서비스를 사용할 수 없습니다. 위치 서비스를 켜 주세요.',
  },
  camera: {
    DENIED: '프로필 사진을 설정하려면 카메라 접근 권한이 필요합니다.',
    LIMITED: '프로필 사진을 설정하려면 카메라 접근 권한이 필요합니다.',
    BLOCKED: '프로필 사진을 설정하려면 카메라 접근 권한이 필요합니다.',
  },
  photo: {
    DENIED: '프로필 사진을 설정하려면 사진 접근 권한이 필요합니다.',
    LIMITED: '프로필 사진을 설정하려면 사진 접근 권한이 필요합니다.',
    BLOCKED: '프로필 사진을 설정하려면 사진 접근 권한이 필요합니다.',
  },
};

type PermissionType = 'location' | 'camera' | 'photo';
type MessageType = 'UNAVAILABLE' | 'DENIED' | 'LIMITED' | 'BLOCKED' | 'ERROR';

const androidPermissions = {
  location: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  camera: PERMISSIONS.ANDROID.CAMERA,
  photo: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
};
const iosPermissions = {
  location: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  camera: PERMISSIONS.IOS.CAMERA,
  photo: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

const permissionsPerOS =
  Platform.OS === 'ios' ? iosPermissions : androidPermissions;

const usePermissions = () => {
  const handleDenied = useCallback((message: string, openSetting: boolean) => {
    return showAlert({
      // title: '권한 요청',
      title: '',
      message,
      buttons: [
        {text: '닫기'},
        {
          text: '설정',
          onPress: () => (openSetting ? Linking?.openSettings() : undefined),
        },
      ],
    });
  }, []);

  const getPermission = useCallback(
    async (
      permissionType: PermissionType,
      onSuccess?: () => void,
      onFailed?: () => void,
    ) => {
      if (Platform.OS !== 'ios' && Platform.OS !== 'android') return;

      const platformPermission: Permission = permissionsPerOS[permissionType];

      const handlePermissionSuccess = () => {
        if (onSuccess) onSuccess();
        return true;
      };

      const handlePermissionError = (
        type: MessageType,
        openSetting = false,
      ) => {
        let message;
        if (type === 'DENIED' || type === 'LIMITED' || type === 'BLOCKED') {
          message = MESSAGES[permissionType][type];
        } else {
          message = MESSAGES[type];
        }
        handleDenied(message, openSetting);
        if (onFailed) onFailed();
        return false;
      };

      let requested: PermissionStatus;
      const checked = await check(platformPermission);
      switch (checked) {
        case RESULTS.UNAVAILABLE:
          return handlePermissionError('UNAVAILABLE', false);
        case RESULTS.GRANTED:
          return handlePermissionSuccess();
        case RESULTS.DENIED:
          requested = await request(platformPermission);
          if (requested === RESULTS.GRANTED) {
            return handlePermissionSuccess();
          } else {
            return handlePermissionError('DENIED', true);
          }
        case RESULTS.LIMITED:
          return handlePermissionError('LIMITED', true);
        case RESULTS.BLOCKED:
          return handlePermissionError('BLOCKED', true);
        default:
          return handlePermissionError('ERROR', true);
      }
    },
    [],
  );

  return {
    getPermission,
  };
};

export default usePermissions;
