import {useRef} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

const useBottomSheet = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const open = () => {
    bottomSheetRef.current?.present();
  };

  const close = () => {
    bottomSheetRef.current?.close();
  };

  return {bottomSheetRef, open, close};
};

export default useBottomSheet;
