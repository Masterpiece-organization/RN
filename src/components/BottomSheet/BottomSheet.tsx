import {useCallback, forwardRef, ReactNode, useMemo} from 'react';
import {StyleSheet, Platform, useColorScheme} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {FullWindowOverlay} from 'react-native-screens';
// import {useBottomSheetStore} from '@/stores/store';
// import {useBottomSheetStore} from '@/hooks/useBottomSheet';
interface BottomSheetProps {
  children: ReactNode;
}

// const BottomSheet = ({children}: BottomSheetProps) => {
//   const colorScheme = useColorScheme();
//   const {isOpen, close} = useBottomSheetStore();
//   const bottomSheetRef = useRef<BottomSheetModal>(null);

//   const renderBackdrop = useCallback(
//     // eslint-disable-next-line @typescript-eslint/no-shadow
//     (props: any, close: () => void) => (
//       <BottomSheetBackdrop
//         {...props}
//         pressBehavior="close"
//         appearsOnIndex={0}
//         disappearsOnIndex={-1}
//         style={styles.backdrop}
//         onPress={close}
//       />
//     ),
//     [],
//   );

//   const containerComponent = useCallback(
//     (props: any) => <FullWindowOverlay>{props.children}</FullWindowOverlay>,
//     [],
//   );

//   useFocusEffect(
//     useCallback(() => {
//       if (isOpen) {
//         bottomSheetRef.current?.present();
//       } else {
//         bottomSheetRef.current?.close();
//       }

//       return () => {
//         bottomSheetRef.current?.close();
//       };
//     }, [isOpen]),
//   );

//   const dynamicStyles = useMemo(
//     () => ({
//       backgroundStyle: {
//         backgroundColor: colorScheme === 'light' ? '#fff' : '#2A2C2E',
//       },
//       indicatorStyle: {
//         backgroundColor: colorScheme === 'light' ? '#DEE0E2' : '#525456',
//       },
//     }),
//     [colorScheme],
//   );

//   const handleSheetChanges = useCallback(
//     (index: number) => {
//       if (index === -1) {
//         close();
//       }
//     },
//     [close],
//   );

//   return (
//     <BottomSheetModal
//       ref={bottomSheetRef}
//       index={0}
//       animateOnMount
//       backdropComponent={props => renderBackdrop(props, close)}
//       bottomInset={36}
//       style={styles.bottomSheetContaier}
//       enableDynamicSizing={true}
//       detached
//       backgroundStyle={dynamicStyles.backgroundStyle}
//       containerComponent={
//         Platform.OS === 'ios' ? containerComponent : undefined
//       }
//       maxDynamicContentSize={600}
//       contentHeight={300}
//       handleIndicatorStyle={dynamicStyles.indicatorStyle}
//       onChange={handleSheetChanges}>
//       <BottomSheetView style={dynamicStyles.backgroundStyle}>
//         {children}
//       </BottomSheetView>
//     </BottomSheetModal>
//   );
// };

const BottomSheet = forwardRef<BottomSheetModalMethods, any>(
  ({children}, ref) => {
    const colorScheme = useColorScheme();
    const renderBackdrop = useCallback(
      // eslint-disable-next-line @typescript-eslint/no-shadow
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          pressBehavior="close"
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          style={styles.backdrop}
        />
      ),
      [],
    );
    const dynamicStyles = useMemo(
      () => ({
        backgroundStyle: {
          backgroundColor: colorScheme === 'light' ? '#fff' : '#2A2C2E',
        },
        indicatorStyle: {
          backgroundColor: colorScheme === 'light' ? '#DEE0E2' : '#525456',
        },
      }),
      [colorScheme],
    );
    const containerComponent = useCallback(
      (props: any) => <FullWindowOverlay>{props.children}</FullWindowOverlay>,
      [],
    );
    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        animateOnMount
        backdropComponent={props => renderBackdrop(props)}
        bottomInset={36}
        style={styles.bottomSheetContaier}
        enableDynamicSizing={true}
        detached
        backgroundStyle={dynamicStyles.backgroundStyle}
        containerComponent={
          Platform.OS === 'ios' ? containerComponent : undefined
        }
        maxDynamicContentSize={600}
        contentHeight={300}
        handleIndicatorStyle={dynamicStyles.indicatorStyle}>
        <BottomSheetView style={dynamicStyles.backgroundStyle}>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  bottomSheetContaier: {
    flex: 1,
    marginHorizontal: 15,
    borderRadius: 24,
    overflow: 'hidden',
    position: 'absolute',
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,.6)',
  },
});

export default BottomSheet;
