import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors, PRIMARY } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  const { user } = useUser();
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image source={{ uri: user?.imageUrl }} style={styles.headerImage} />
        <View>
          <Text style={styles.textContainer}>Welcome, </Text>
          <Text style={styles.userName}>{user?.fullName}</Text>
        </View>
      </View>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color='black' />
        <TextInput placeholder="Search...." style={styles.input} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: PRIMARY,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  userContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  textContainer:{
    color: '#fff'
  },
  headerImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'Inter',
    color: '#fff'
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
  },
  input: {
    fontFamily: 'Inter',
    fontSize: 16,
    flex: 1
  }
});
