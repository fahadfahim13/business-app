import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Intro = (props: { business: any }) => {
  const { business } = props;
  const router = useRouter();
  return (
    <View>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={40} color="white" />
        </TouchableOpacity>
        <Ionicons name="heart-outline" size={40} color="white" />
      </View>
      <Image source={{ uri: business?.imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{business.name}</Text>
        <Text style={styles.addressText}>{business.address}</Text>
      </View>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 320,
  },
  iconContainer: {
    position: "absolute",
    zIndex: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
    marginTop: 10,
  },
  textContainer: {
    padding: 20,
    marginTop: -20,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  nameText: {
    fontSize: 28,
    fontFamily: 'Inter-bold'
  },
  addressText: {
    fontSize: 18,
    fontFamily: 'Inter-light'
  }
});
