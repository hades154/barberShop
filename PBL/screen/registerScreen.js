
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
import { registerUser } from '../api';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleRegister = async () => {
        try {
            const userData = {
              email,
              password,
              name,
            };
        
            const response = await registerUser(userData);
            
            if (response && response.data) {
              
            } else {
              // Đặt lại giá trị trường đăng ký
              setEmail('');
              setPassword('');
              setName('');
              alert('Đăng kí thành công');
              navigation.navigate('Login');

              
            }
          } catch (error) {
            console.error(error); // Xử lý lỗi, hiển thị thông báo lỗi
          }
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
                    Register
                </Text>

                <InputField
                    label={'Username ID'}
                    onChange={(value) => { setName(value) }}
                    value={name}
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

                    fieldButtonFunction={() => { }}
                />

                <InputField
                    label={'Confirm password'}
                    onChange={(value) => { setConfirmPassword(value) }}
                    value={confirmPassword}
                    icon={
                        <Ionicons
                            name="ios-lock-closed-outline"
                            size={20}
                            color="#666"
                            style={{ marginRight: 5 }}
                        />
                    }
                    inputType="password"
                    fieldButtonFunction={() => { }}
                />

                <CustomButton label={"Register"} onPress={() => {

                    let errorFlag = false;
                    // input validation
                    if (email.length == 0 || password.length == 0) {
                        alert("username and password can't null")
                    }

                    else {
                        if (password.length > 7 && password.length < 20) {
                            if (password == confirmPassword) {

                                handleRegister()
                            }
                            else {
                                alert("password and confirmPassword not matched")
                            }
                        }
                        else {
                            alert("password was wrong format")
                        }
                    }


                }} />

                <Text style={{ textAlign: 'center', color: '#666', marginBottom: -40 }}>
                </Text>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 40,
                    }}>
                    <Text>Already has account? return to</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={{ color: '#669966', fontWeight: '700' }}> Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;