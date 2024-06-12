import { View, Text, StyleSheet } from "react-native";
import React from "react";
import UserDetails from "@/components/Profile/UserDetails";
import MenuList from "@/components/Profile/MenuList";

const profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>profile</Text>
      <UserDetails />
      <MenuList />
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontFamily: "Inter-bold",
    fontSize: 28,
  },
});
