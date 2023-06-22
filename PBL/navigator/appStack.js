import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screen/loginScreen';
import HomeAdmin from '../screen/homeAdmin';
import RegisterScreen from '../screen/registerScreen';
import TabNavigator from './tabCustomer';
import DetailPage from '../screen/shopDetailPage';
import TabSalon from './tabSalon';
import BookingScreen from '../screen/bookingScreen';
const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="Details" component={DetailPage} />
        <Stack.Screen name="TabSalon" component={TabSalon} />
        <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
      </Stack.Navigator>
    );
};

export default AppStack;