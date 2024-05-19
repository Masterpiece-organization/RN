import {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';

function useButtonActive() {
  const route = useRoute();
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    // "Main" 스크린이 활성화되면 버튼을 활성화합니다.
    if (route.name === 'Main') {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [route]);

  return isButtonActive;
}

export default useButtonActive;
