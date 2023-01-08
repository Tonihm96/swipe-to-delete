import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  ListRenderItemInfo,
  FlatList,
  ViewToken
} from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { getCountryCode } from './src/utils';
import { aircraftList } from './assets/aircraft';
import { ListItem } from './src/components/ListItem';
import { Header } from './src/components/Header';

const LIST = aircraftList
  .filter(item => item.year >= 1939 && item.year <= 1945)
  .map((item, index) => ({
    index: index,
    name: item.name,
    country: item.country,
    countryFlag: getCountryCode(item.country),
    year: item.year
  }));

const App = () => {
  const [data, setData] = useState(LIST);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setData(LIST);
  };

  const onDelete = useCallback((index: number) => {
    setData(prevState => prevState.filter(item => item.index !== index));
  }, []);

  const renderItem = ({ item }: ListRenderItemInfo<typeof data[number]>) => {
    return (
      <ListItem
        key={item.name}
        index={item.index}
        name={item.name}
        country={item.country}
        countryFlag={item.countryFlag}
        year={item.year}
        onDelete={onDelete}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor='transparent'
        barStyle='dark-content'
      />
      <Header />
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: (Platform.OS === 'android' ? StatusBar.currentHeight : 0) + 20
  },
  listContainer: {
    paddingTop: 28
  }
});

export default gestureHandlerRootHOC(App);
