import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect} from 'react';
import {Color} from '../config/Colors';
import {Bar, Bottle, Disco, Karaoke} from '../config/Svg';
import Header from '../components/header/Header';
import Modal from '../components/modal/Modal';
import {useCameraDevice, useCameraPermission} from 'react-native-vision-camera';
const eventImage = [
  require('../assets/image/new_events/event1.png'),
  require('../assets/image/new_events/event2.png'),
  require('../assets/image/new_events/event3.png'),
];

const heroBg = require('../assets/image/HeroNightLife.png');
const Nightlife = () => {
  const bestPlaceHiglight = [
    {
      name: 'Nightclub',
      icon: <Disco />,
    },
    {
      name: 'KTV',
      icon: <Karaoke />,
    },
    {
      name: 'Pregames',
      icon: <Bottle />,
    },
    {
      name: 'Bar',
      icon: <Bar />,
    },
  ];

  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message: 'Cool Photo App needs access to your camera ',
          buttonPositive: 'ok',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  return (
    <>
      <ScrollView style={styles.container}>
        <Header />
        <Image source={heroBg} style={styles.heroBg} />
        <View style={styles.containerSection}>
          <Text style={styles.subTitle}>Find best place</Text>
          <View style={styles.cardPlaceContainer}>
            {bestPlaceHiglight?.map(item => (
              <TouchableOpacity key={item.name} style={styles.cardPlace}>
                {item.icon}
                <Text style={styles.textPlace}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View
          style={[
            styles.containerSection,
            {marginTop: 20, paddingEnd: 0, paddingBottom: 60},
          ]}>
          <Text style={styles.subTitle}>Newest event</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {eventImage?.map((item, idx) => (
              <Image key={idx} source={item} style={styles.imageEvent} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.primary.dark,
  },
  heroBg: {
    resizeMode: 'cover',
    height: 330,
    width: Dimensions.get('screen').width,
  },
  containerSection: {
    padding: 10,
  },
  cardPlaceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textPlace: {
    fontFamily: 'Railway',
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  cardPlace: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 4,
    paddingVertical: 8,
    width: 80,
    height: 60,
    backgroundColor: Color.secondary.dark,
  },
  subTitle: {
    marginBottom: 10,
    color: Color.text.primary,
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Railway',
  },
  imageEvent: {
    width: 150,
    height: 200,
    marginRight: 10,
    resizeMode: 'cover',
  },
});

export default Nightlife;
