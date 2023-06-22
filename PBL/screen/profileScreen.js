import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const PersonPage = ({ navigation }) => {

  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [numberPhone, setNumberPhone] = useState('');
  const [email, setEmail] = useState("");
  const [city,setCity] = useState("");

      const removeKeyFromAsyncStorage = async (key) => {
        try {
          await AsyncStorage.removeItem(key);
          console.log(`Key "${key}" đã được xóa thành công từ asyncstore.`);
        } catch (error) {
          console.log(
            `Đã xảy ra lỗi khi xóa key "${key}" từ asyncstore:`,
            error
          );
        }
      };

     const handleLogout = async () => {
       await removeKeyFromAsyncStorage("userData");

       navigation.navigate("Login");
     };


  useEffect(() => {
     AsyncStorage.getItem("userData").then((res) => {
       const cvUserData = JSON.parse(res);
       console.log(cvUserData);
       setAvatar(cvUserData.avatar);
       setUsername(cvUserData.name);
       setEmail(cvUserData.email);
       setCity(cvUserData.city);
       setAddress(cvUserData.address);
       setNumberPhone(cvUserData.phoneNumber);
     });

 

  


  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar.Image
            source={{
              uri: avatar,
            }}
            size={80}
          />

          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {username}
            </Title>
            <Caption style={styles.caption}>{email}</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{address}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {numberPhone}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>@gmail.com</Text>
        </View>
      </View>

      {/* <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#669966",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title>140 500 000đ</Title>
          <Caption>Wallet</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>12</Title>
          <Caption>Orders</Caption>
        </View>
      </View> */}

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#669966" size={25} />
            <Text style={styles.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#669966" size={25} />
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#669966" size={25} />
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#669966" size={25} />
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={handleLogout}>
          <View style={styles.menuItem}>
            <Icon name="cog-outline" color="#669966" size={25} />
            <Text style={styles.menuItemText}>Logout</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default PersonPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});