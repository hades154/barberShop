import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Ionicons } from '@expo/vector-icons';

import pendingScreen from '../screen/topTab/pending';
import InProScreen from '../screen/topTab/inProgress';
import DoneScreen from '../screen/topTab/done';
import CancelScreen from '../screen/topTab/cancelled';
import { StatusBar } from 'react-native';


const Tab = createMaterialTopTabNavigator();

const StatusNavigator= () => {
  return (
    <Tab.Navigator style={{ paddingTop: StatusBar.currentHeight }}>

      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Ionicons
              size={25}
              name={focused ? 'hourglass-outline' : 'hourglass-outline'}
              color={focused ? 'blue' : '#272727'}
            />
          ),
        }}
        component={pendingScreen}
        name='Pending'
      />
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Ionicons
              size={25}
              name={focused ? 'refresh-outline' : 'refresh-outline'}
              color={focused ? 'blue' : '#272727'}
            />
          ),
        }}
        component={InProScreen}
        name='Inpro'
      />
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Ionicons
              size={25}
              name={focused ? 'close-circle-outline' : 'close-circle-outline'}
              color={focused ? 'blue' : '#272727'}
            />
          ),
        }}
        component={CancelScreen}
        name='Cancel'
      />
      <Tab.Screen
        options={{
          title: ({ color, focused }) => (
            <Ionicons
              size={25}
              name={focused ? 'checkmark-circle-outline' : 'checkmark-circle-outline'}
              color={focused ? 'blue' : '#272727'}
            />
          ),
        }}
        component={DoneScreen}
        name='Done'
      />
    </Tab.Navigator>
  );
};

export default StatusNavigator;