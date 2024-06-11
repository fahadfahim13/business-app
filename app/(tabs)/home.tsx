import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '@/components/HomeScreen/Header'
import Slider from '@/components/HomeScreen/Slider'
import Category from '@/components/HomeScreen/Category'
import BusinessList from '@/components/HomeScreen/BusinessList'

const home = () => {
  return (
    <ScrollView>
      {/* Header */}
      <Header />
      {/* Slider */}
      <Slider />
      {/* Category List */}
      <Category explore={true} />
      {/* Business List */}
      <BusinessList />
    </ScrollView>
  )
}

export default home;