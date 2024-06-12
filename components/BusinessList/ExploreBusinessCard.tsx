import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Colors, PRIMARY } from "@/constants/Colors";
import { useRouter } from "expo-router";

const ExploreBusinessCard = (props: { business: any }) => {
  const { business } = props;
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => {
        router.push('businessDetails/'+business.id);
    }}>
    <View style={styles.container}>
      <Image source={{ uri: business.imageUrl }}
      style={styles.image} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.name}>{business.name}</Text>
        <Text style={styles.address}>{business.address}</Text>
        <View style={styles.ratingContainer}>
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/2107/2107957.png",
            }}
            style={styles.starImage}
          />
          <Text style={styles.ratingText}>4.5</Text>
        </View>
      </View>
    </View>
    
    
    </TouchableOpacity>
  );
};

export default ExploreBusinessCard;

const styles = StyleSheet.create({
  container: {
    margin: 8,
    padding: 8,
    // display: "flex",
    // flexDirection: "row",
    // gap: 12,
    backgroundColor: "#FFF",
    borderRadius: 16,
  },
  descriptionContainer: {
    flex: 1,
    padding: 10
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 16,
  },
  name: {
    fontFamily: "Inter-bold",
    fontSize: 20,
  },
  address: {
    fontFamily: "Inter-light",
    fontSize: 12,
    color: Colors.light.text
  },
  ratingContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  starImage: { width: 20, height: 20 },
  ratingText: {
    fontFamily: "Inter",
  },
  categoryText: {
    fontFamily: "Inter",
    backgroundColor: PRIMARY,
    color: "#FFF",
    padding: 4,
    fontSize: 12,
    borderRadius: 4,
  },
});
