import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

const SearchCard = ({ data,onPress }) => {
  return (
    <Pressable
      style={[styles.container]}
      onPress={onPress}
      
    >
      <Image style={styles.image} source={{ uri: data.avatar}} />
      <Text style={styles.title}>{data.name}</Text>
   
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5,
  },
  selectedContainer: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    paddingHorizontal: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 0,
    paddingHorizontal: 10,
  },
});

export default SearchCard;
