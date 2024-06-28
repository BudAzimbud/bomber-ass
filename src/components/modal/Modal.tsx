import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef} from 'react';
import {View, Text, StyleSheet, Button, Pressable} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {Color} from '../../config/Colors';
import {ArrowLeft} from '../../config/Svg';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

type Props = {
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = (props: Props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const isFocus = useIsFocused()

  const snapPoints = useMemo(() => ['30%', '30%'], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
  }, []);

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  },[isFocus])

  useEffect(() => {
    handlePresentModalPress();
  }, [handlePresentModalPress]);

  // renders
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        backgroundStyle={styles.container}
        handleIndicatorStyle={{
          backgroundColor: '#424C5A',
        }}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <BottomSheetView style={styles.contentContainer}>
          <Pressable style={styles.backButton} onPress={props.onClose}>
            <ArrowLeft />
          </Pressable>
          {props.children}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: Color.primary.dark,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 6  
  },
  backButton: {
    position:'absolute',
    left: 10,
  },
});

export default Modal;
