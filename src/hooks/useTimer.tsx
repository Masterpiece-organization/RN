/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState, useRef, Dispatch, SetStateAction} from 'react';
import showAlert from '@/utils/showAlert';

interface TimerProps {
  timerOn: boolean;
  setTimerOn: Dispatch<SetStateAction<boolean>>;
}

const useTimer = ({timerOn, setTimerOn}: TimerProps) => {
  const [minutes, setMinutes] = useState<number>(3);
  const [seconds, setSeconds] = useState<number>(0);

  // Use a ref to store the interval ID
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerOn) {
      countdownRef.current = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          }
          if (prevSeconds === 0 && minutes > 0) {
            setMinutes(prevMinutes => prevMinutes - 1);
            return 59;
          }
          return prevSeconds;
        });

        if (minutes === 0 && seconds === 1) {
          // Update this line
          showAlert({
            title: '유효시간 초과',
            message: '유효시간이 초과되었습니다. 다시 시도해 주세요.',
            onPress: () => setTimerOn(false),
          });

          // Clear the interval and reset the ref
          clearInterval(countdownRef.current!);
          countdownRef.current = null;
        }
      }, 1000);
    } else if (!timerOn && countdownRef.current !== null) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
      setMinutes(3);
      setSeconds(0);
    }

    return () => {
      // Clean up function
      if (countdownRef.current !== null) {
        clearInterval(countdownRef.current);
      }
    };
  }, [timerOn, minutes, seconds]); // Update the dependencies

  return {timerOn, minutes, seconds};
};

export default useTimer;
