import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import React from 'react';
import {Color} from '../config/Colors';
import {Bar, Bottle, Disco, Karaoke} from '../config/Svg';
import Header from '../components/header/Header';
import Modal from '../components/modal/Modal';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
const eventImage = [
  require('../assets/image/new_events/event1.png'),
  require('../assets/image/new_events/event2.png'),
  require('../assets/image/new_events/event3.png'),
];

const heroBg = require('../assets/image/HeroNightLife.png');
const Nightlife = () => {
  const navigation = useNavigation();
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
      <Modal
        onClose={() => {
          navigation.navigate('NightLife');
        }}>
        <View>
          <Text style={styles.titleModal}>Scan On Table</Text>
          <Text style={styles.descModal}>
            Check your table or asking waiter to give you a QR Code, you can
            start order by scanning.
          </Text>
          <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}
            colors={[Color.gradient.parple2, Color.gradient.parple1]}
            style={styles.btnGotcha}>
            <Pressable onPress={() => navigation.navigate('ScanQR')}>
              <Text style={styles.textGotcha}>Gotcha</Text>
            </Pressable>
          </LinearGradient>
        </View>
      </Modal>
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
  titleModal: {
    color: Color.warning.light,
    fontWeight: '700',
    fontFamily: 'Inter',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  descModal: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'Inter',
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 20,
  },
  btnGotcha: {
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  textGotcha: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default Nightlife;
