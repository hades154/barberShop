
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/customButton';
import InputField from '../components/Input';


const HomeAdmin = ({ navigation }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = () => {
  
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>

          <Image
            height={200}
            width={200}
            style={{ transform: [{ rotate: '-5deg' }] }}
            source={require('../assets/logo/barber4.png')}
          />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          home admin
        </Text>

        <InputField
          label={'Email ID'}
          onChange={(value) => { setUsername(value) }}
          value={username}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
        />

        <InputField
          label={'Password'}
          onChange={(value) => { setPassword(value) }}
          value={password}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => { }}
        />

        <CustomButton label={"Login"} onPress={() => { handleLogin({ username: username, password: password }) }} />

        <Text style={{ textAlign: 'center', color: '#666', marginBottom: -20 }}>
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 50,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: '#CCCCFF', fontWeight: '700' }}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeAdmin;