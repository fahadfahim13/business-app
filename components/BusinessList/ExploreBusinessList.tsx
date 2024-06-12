import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'
import React from 'react'
import ExploreBusinessCard from './ExploreBusinessCard';

const ExploreBusinessList = (props: { businessList: any[] }) => {
    const {businessList} = props;
  return (
    <ScrollView>
      <FlatList data={businessList}
      scrollEnabled
      renderItem={({item, index}) => (
        <ExploreBusinessCard business={item} key={index} />
      )} />
    </ScrollView>
  )
}

export default ExploreBusinessList;

const styles = StyleSheet.create({
    container: {}
})