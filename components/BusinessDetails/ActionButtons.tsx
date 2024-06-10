import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ActionButtons = (props: { business: any }) => {
  const { business } = props;
  const iconBackgroundColors = ["#55AD9B", "#006989", "#FF7F3E", "#FF0000"];
  const actionButtonMenu = [
    {
      id: 1,
      name: "Call",
      iconName: "call",
      icon: (size?: number, color?: string) => (
        <Ionicons
          name="call"
          size={size ?? 24}
          color={color ?? "black"}
          style={styles.iconStyle}
        />
      ),
      url: "tel:" + business?.contact,
    },
    {
      id: 2,
      name: "Location",
      iconName: "location",
      icon: (size?: number, color?: string) => (
        <Ionicons
          name="location"
          size={size ?? 24}
          color={color ?? "black"}
          style={styles.iconStyle}
        />
      ),
      url:
        "https://www.google.com/maps/search/?api=1&query=" + business?.address,
    },
    {
      id: 3,
      name: "Share",
      iconName: "share-social",
      icon: (size?: number, color?: string) => (
        <Ionicons
          name="share-social"
          size={size ?? 24}
          color={color ?? "black"}
          style={styles.iconStyle}
        />
      ),
      url: "",
    },
    {
      id: 4,
      name: "Website",
      icon: (size?: number, color?: string) => (
        <Ionicons
          name="globe"
          size={size ?? 24}
          color={color ?? "black"}
          style={styles.iconStyle}
        />
      ),
      iconName: "globe",
      url: "https://" + business?.website,
    },
  ];

  const onClick = (url: string) => {
    Linking.openURL(url);
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={actionButtonMenu}
        showsHorizontalScrollIndicator={false}
        numColumns={actionButtonMenu.length}
        columnWrapperStyle={{
          justifyContent: 'space-between'
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.itemContainer}
          onPress={() => onClick(item.url)}>
            <View
              style={{
                ...styles.iconContainer,
                backgroundColor: iconBackgroundColors[index],
              }}
            >
              {item.icon(20, "white")}
            </View>
            <Text style={styles.iconText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ActionButtons;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: -20,
    backgroundColor: "#fff",
  },
  itemContainer: {
    display: "flex",
    padding: 12,
    alignItems: 'center'
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    padding: 4,
    borderRadius: 40,
    backgroundColor: "green",
  },
  iconStyle: {
    color: "white",
  },
  iconText: {
    textAlign: 'center',
    fontFamily: 'Inter-light'
  }
});
