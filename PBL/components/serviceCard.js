import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

const ServiceCard = ({ service, onPress, isSelected }) => {
  return (
    <Pressable
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onPress}
    >
      <Image style={styles.image} source={{ uri: service?.serviceImage }} />
      <Text style={styles.title}>{service.serviceName}</Text>
      <Text style={styles.price}>{service.servicePrice} VND</Text>
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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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

export default ServiceCard;
