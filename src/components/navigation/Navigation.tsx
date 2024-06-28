import React from 'react';
import 'react-native-gesture-handler';
import Order from '../../screens/Order';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Event from '../../screens/Event';
import Friend from '../../screens/Friend';
import Profile from '../../screens/Profile';
import Nightlife from '../../screens/Nightlife';
import ScanQR from '../../screens/ScanQR';
import Product from '../../screens/Product';
import {Color} from '../../config/Colors';
import {
  QRCodeIcon,
  GroupIcon,
  HalfmoonIcon,
  StartIcon,
  UserIcon,
} from '../../config/Svg';

export type RootStackParamList = {
  NightLife: undefined;
  Event: undefined;
  Friend: undefined;
  Profile: undefined;
  Order: undefined;
  ScanQR: undefined;
  Product: {
    qrCode?: string;
  };
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: Color.primary.dark,
        },
        tabBarActiveTintColor: 'yellow',
        tabBarStyle: {
          backgroundColor: Color.primary.dark,
          borderTopWidth: 0,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          position: 'absolute',
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({size, focused, color}) => {
            return <HalfmoonIcon color={'white'}  />;
          },
        }}
        name="NightLife"
        component={Nightlife}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({size, focused, color}) => {
            return <StartIcon stroke={color}  />;
          },
        }}
        name="Event"
        component={Event}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({size, focused, color}) => {
            return <GroupIcon stroke={color}  />;
          },
        }}
        name="Friend"
        component={Friend}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({size, focused, color}) => {
            return <UserIcon stroke={color}  />;
          },
        }}
        name="Profile"
        component={Profile}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({size, focused, color}) => {
            return <QRCodeIcon stroke={color}  />;
          },
        }}
        name="Order"
        component={Order}
      />
    </Tab.Navigator>
  );
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="BottomNavigator">
        <Stack.Screen name="BottomNavigator" component={MyTabs} />
        <Stack.Screen name="ScanQR" component={ScanQR} />
        <Stack.Screen name="Product" component={Product} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
