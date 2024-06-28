import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, useRef} from 'react';
import {Text, View, Button, Image, Pressable} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraDevices,
} from 'react-native-vision-camera';

const ScanQR = () => {
  const [cameraPermission, setCameraPermission] = useState<boolean>(false);
  const device = useCameraDevice('back'); // Set the initial camera device
  const camera = useRef<Camera>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const navigation = useNavigation();

  const checkCameraPermission = async () => {
    const status = await Camera.getCameraPermissionStatus();
    console.log('status', status);

    if (status === 'granted') {
      setCameraPermission(true);
    } else if (status === 'denied') {
      const permission = await Camera.requestCameraPermission();
      setCameraPermission(permission === 'granted');
    } else {
      setCameraPermission(false);
    }
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  if (cameraPermission === null) {
    return <Text>Checking camera permission...</Text>;
  } else if (!cameraPermission) {
    return <Text>Camera permission not granted</Text>;
  }

  if (!device) {
    return <Text>No camera device available</Text>;
  }

  const takePhoto = async () => {
  

    try {
      if (!camera.current) {
        console.error('Camera reference not available.', camera);
        return;
      }
      console.log('test');
      const photo = await camera.current.takePhoto();
     
      if (photo) {
        navigation.navigate('Product', {
          // TODO: change value if api already exists
          qrCode: 'example-qr-code-value',
        });
        setCapturedPhoto(`file://${photo.path}`);
        setShowPreview(true);
      } else {
        console.error('Photo captured is undefined or empty.');
      }
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Camera
        style={{flex: 1}}
        device={device}
        isActive={true}
        ref={camera}
        photo={true}
        video={true}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 10,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Pressable onPress={takePhoto}>
          <View
            style={{
              borderRadius: 50,
              height: 50,
              width: 50,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
            }}></View>
        </Pressable>
      </View>
    </View>
  );
};

export default ScanQR;
