import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { PRIMARY } from '@/constants/Colors';
import Category from '@/components/HomeScreen/Category';

const explore = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Explore More</Text>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color='black' />
        <TextInput placeholder="Search...." style={styles.input} />
      </View>

      {/* Category */}
      <Category />

      {/* Business List */}
    </View>
  )
}

export default explore;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  heading: {
    fontFamily: 'Inter-bold',
    fontSize: 28
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 12,
    marginVertical: 12,
    marginTop: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: PRIMARY
  },
  input: {
    fontFamily: 'Inter',
    fontSize: 16,
    flex: 1
  }
});