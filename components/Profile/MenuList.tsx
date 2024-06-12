import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { PRIMARY } from "@/constants/Colors";
import { useRouter } from "expo-router";

const MenuList = () => {
  const router = useRouter();
  const menuList = [
    {
      id: 1,
      name: "Add Business",
      icon: require("../../assets/images/add-icon.png"),
      path: "/business/add-business",
    },
    {
      id: 2,
      name: "My Businesses",
      icon: require("../../assets/images/my-business.png"),
      path: "",
    },
    {
      id: 3,
      name: "Share App",
      icon: require("../../assets/images/share-icon.png"),
      path: "",
    },
    {
      id: 4,
      name: "Logout",
      icon: require("../../assets/images/logout.png"),
      path: "",
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.listcontainer}
            onPress={() => router.push(item.path)}
          >
            <Image source={item.icon} style={styles.image} />
            <Text style={styles.iconText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.bottomText}>Developed By Fahim Hasnain Fahad.</Text>
    </View>
  );
};

export default MenuList;

const styles = StyleSheet.create({
  container: {
    marginTop: 48,
  },
  listcontainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    padding: 8,
    borderWidth: 1,
    margin: 8,
    borderRadius: 12,
    borderColor: PRIMARY,
  },
  image: {
    width: 48,
    height: 48,
  },
  iconText: {
    fontFamily: "Inter-light",
    fontSize: 16,
    flex: 1,
  },
  bottomText: {
    fontFamily: "Inter",
    textAlign: "center",
    color: PRIMARY,
    marginTop: 100,
  },
});
