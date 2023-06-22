
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/customButton';
import InputField from '../components/Input';
import { loginUser } from '../api';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



  const handleLogin = async() => {
    try {

         const loadFirebaseConfig = () => {
           return import("../configFirebase").then((module) => {
             // Xử lý cấu hình Firebase tại đây
             const { db } = module;
             // Tiếp tục xử lý hoặc gọi các hàm liên quan đến Firebase Firestore
           });
         };

         await loadFirebaseConfig();
      // Xác thực người dùng
      const response = await loginUser(email, password);
      const currentUser = response.user;
      const userData = {
        avatar:currentUser.avatar,
        address:currentUser.address,
        email:currentUser.email,
        name:currentUser.name,
        phoneNumber:currentUser.phoneNumber,
        uid:currentUser.uid,
        role:currentUser.uid,
        city:currentUser.city
      }

     

      const userDataString = JSON.stringify(userData);
      AsyncStorage.setItem("userData", userDataString);
      // console.log(response);     
      if (response.url ==='/admin') {

        navigation.navigate('HomeAdmin');
      } else if (response.url ==='/customer') {
        navigation.navigate('Home');
      } else if (response.url ==='/salon') {
        navigation.navigate('TabSalon');
      }
      else{ alert('Vai trò đăng nhập không hợp lệ')
    };
    } catch (error) {
      // console.log(error)
    }
    
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>

          <Image
            height={150}
            width={150}
            style={{ transform: [{ rotate: '-5deg' }] }}
            source={require('../assets/logo/barber4.png')}
          />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 10,
          }}>
          Login
        </Text>

        <InputField
          label={'Email ID'}
          onChange={(value) => { setEmail(value) }}
          value={email}
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

        <CustomButton label={"Login"} onPress={() => { handleLogin() }} />

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
            <Text style={{ color: '#669966', fontWeight: '700' }}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;