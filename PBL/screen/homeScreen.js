import React, { useEffect, useState } from 'react';
import { Text, View, Image, TextInput, StyleSheet, ScrollView, FlatList ,Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import Swiper from 'react-native-swiper';
import COLORS from '../components/colors';
import { getAllBarbershop } from '../api';
import Icon from 'react-native-vector-icons/MaterialIcons';
const width = Dimensions.get('window').width / 2 - 30;
 

const HomeScreen = ({ navigation }) => {
  const [searchText,setSearchText] = useState("");
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBarbershop();
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    
  }, [])

 


  const Card = ({ shop }) => {

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Details', { id: shop.uid })}>
        <View style={style.card}>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <Image
              style={{ width: 125, height: 125,borderRadius:5 }}
              source={{ uri: shop.avatar }}
            />
          </View>

          <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 10 }}>
            {`${shop.name}`.slice(0, 19)} 
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.white }}>
       <ScrollView  style={{padding:20}}>
       <View style={style.header}>
        <View>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Chào mừng bạn đến với</Text>
          <Text style={{ fontSize: 38, color: COLORS.green, fontWeight: 'bold' }}>
            Barber Booking 
          </Text>
        </View>
        
      </View>
  
      <View style={{ marginTop: 5, }}>
        <View style={style.sliderContainer}>
          <Swiper
            autoplay
            horizontal={false}
            height={200}
            activeDotColor="#FF6347">
            <View style={style.slide}>
              <Image
                source={require('../assets/image/shop1.jpg')}
                resizeMode="cover"
                style={style.sliderImage}
              />
            </View>
            <View style={style.slide}>
              <Image
                source={require('../assets/image/shop2.jpg')}
                resizeMode="cover"
                style={style.sliderImage}
              />
            </View>
            <View style={style.slide}>
              <Image
                source={require('../assets/image/shop3.jpg')}
                resizeMode="cover"
                style={style.sliderImage}
              />
            </View>
          </Swiper>
        </View>
        <Text style={{ fontSize: 16, fontWeight: "600", marginTop:10 }}>Chọn barberShop </Text>
      </View>
    
      <FlatList
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 10,
          paddingBottom: 50,
        }}
        numColumns={2}
        data={data}
        renderItem={({ item }) => {
          return <Card shop={item} />;
        }}
      />
      <View style={{ paddingBottom: 20 }}></View>
       </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
    marginLeft:1,
    marginRight:10,
    justifyContent: 'space-between',
  },
  categoryText: { fontSize: 16, color: 'grey', fontWeight: 'bold' },
  categoryTextSelected: {
    color: COLORS.green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: COLORS.green,
  },
  card: {
    height: 175,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  header: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    color: COLORS.dark,
  },
  sortBtn: {
    marginLeft: 10,
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    height: 200,
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
});

export default HomeScreen;
