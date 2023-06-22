import React, { useState ,useEffect} from 'react';
import { View, TextInput, Button, FlatList, Text ,SafeAreaView,ScrollView,StyleSheet,TouchableOpacity} from 'react-native';
import COLORS from '../components/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { db } from '../configFirebase';
import SearchCard from '../components/searchCard';



const SearchPage = ({navigation}) => {

  const [searchText,setSearchText] = useState("");
  const [data, setData] = useState([])

  const handleSearch = () => {
    const fetchData = async () => {
      const nameSnapshot = await db
        .collection('barberShops')
        .where('name', '>=', searchText)
        .where('name', '<=', searchText + '\uf8ff')
        .get();
  
      const citySnapshot = await db
        .collection('barberShops')
        .where('city', '>=', searchText)
        .where('city', '<=', searchText + '\uf8ff')
        .get();
  
        const barberShopsByName = nameSnapshot.docs.map(doc => ({
          uid: doc.id,
          ...doc.data()
        }));
        const barberShopsByCity = citySnapshot.docs.map(doc => ({
          uid: doc.id,
          ...doc.data()
        }));
        
  
      const combinedBarberShops = [...barberShopsByName, ...barberShopsByCity];
        
      setData(combinedBarberShops);
    };
  
    fetchData();
  };
  


  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.white }}>
       <ScrollView  style={{padding:20}}>
       <View style={{marginTop: 10, flexDirection: 'row'}}>
        <View style={style.searchContainer}>
          <Icon name="search" size={25} style={{marginLeft: 20}} />
          <TextInput placeholder="Search" style={style.input}
             value={searchText}
             onChangeText={setSearchText} />
        </View>
        <TouchableOpacity  onPress={handleSearch} >
        <View style={style.sortBtn}>
          <Icon name="sort" size={30} color={COLORS.white} />
        </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 10 }}>
        {data && (
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={data}
            renderItem={({ item }) => {
              console.log(item.name);
              return (
                <SearchCard
                  key={item.name}
                  data={item}
                  onPress={() =>navigation.navigate('Details', { id: item.uid })}
                />
              );
            }}
            keyExtractor={(item) => item.uid}
          />
        )}
      </View>
       </ScrollView>

    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  searchContainer: {
    height: 50,
    backgroundColor: COLORS.light,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default SearchPage;
