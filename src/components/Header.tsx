import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aircraft List</Text>
      <Text style={styles.legend}>Swipe left to delete</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: '#e9e9e9',
    paddingLeft: 30,
    paddingBottom: 20
  },
  title: {
    fontSize: 40,
    fontFamily: 'sans-serif-light',
    fontWeight: 'bold'
  },
  legend: {
    fontSize: 20,
    fontFamily: 'sans-serif-light',
    color: 'grey'
  }
});

export { Header };
