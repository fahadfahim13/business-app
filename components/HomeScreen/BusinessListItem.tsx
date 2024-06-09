import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors, PRIMARY } from "@/constants/Colors";

const BusinessListItem = (props: {
  business: any;
  onBusinessPress: (business: any) => void;
}) => {
  const { business, onBusinessPress } = props;

  return (
    <TouchableOpacity onPress={() => onBusinessPress(business)}>
      <View style={styles.container}>
        <Image source={{ uri: business.imageUrl }} style={styles.cardImage} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{business.name}</Text>
          <Text style={styles.address}>
            {business.address.length > 36
              ? `${business.address.slice(0, 36)}...`
              : business.address}
          </Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.ratingContainer}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/2107/2107957.png",
              }}
              style={styles.starImage}
            />
            <Text style={styles.ratingText}>4.5</Text>
          </View>
          <Text style={styles.categoryText}>{business.category}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BusinessListItem;

const styles = StyleSheet.create({
  container: {
    width: 260,
    marginLeft: 20,
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 8,
  },
  cardImage: {
    width: 240,
    height: 140,
    borderRadius: 16,
  },
  textContainer: {
    marginTop: 8,
  },
  name: {
    fontFamily: "Inter-bold",
    fontSize: 16,
    textAlign: "center",
  },
  address: {
    fontSize: 12,
    fontFamily: "Inter-light",
    textAlign: "center",
    color: Colors.light.text,
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
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  categoryText: {
    fontFamily: 'Inter',
    backgroundColor: PRIMARY,
    color: '#FFF',
    padding: 4,
    fontSize: 12,
    borderRadius: 4,

  },
});
