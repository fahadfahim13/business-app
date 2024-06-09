import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Colors, PRIMARY } from "@/constants/Colors";

const BusinessListCard = (props: { business: any }) => {
  const { business } = props;

  return (
    <View style={styles.container}>
      <Image source={{ uri: business.imageUrl }} style={styles.image} />
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
  );
};

export default BusinessListCard;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#FFF",
    borderRadius: 16,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  descriptionContainer: {
    flex: 1
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
