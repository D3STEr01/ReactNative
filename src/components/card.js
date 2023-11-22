// CardComponent.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CardComponent = ({ title, description }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 10,
    backgroundColor: 'lightgray',
    padding: 35,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
});

export default CardComponent;
