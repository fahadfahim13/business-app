import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const About = (props: {business: any}) => {
  const {business} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About</Text>
      <Text style={styles.description}>{business?.about}</Text>
    </View>
  )
}

export default About;


const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF',
    marginTop: -20,
  },
  heading: {
    fontSize: 28,
    fontFamily: 'Inter-bold'
  },
  description: {
    fontFamily: 'Inter-light',
    lineHeight: 24
  }
})