import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { PRIMARY } from "@/constants/Colors";
import Category from "@/components/HomeScreen/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import ExploreBusinessList from "@/components/BusinessList/ExploreBusinessList";

const explore = () => {
  const [businessList, setBusinessList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getBusinessesByCategory = async (name: string) => {
    setLoading(true);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", name)
    );
    let d: any[] = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((item) => {
      d.push({ id: item.id, ...item.data()});
    });
    setBusinessList(d);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Explore More</Text>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="black" />
        <TextInput placeholder="Search...." style={styles.input} />
      </View>

      {/* Category */}
      <Category onCategorySelect={getBusinessesByCategory} />

      {/* Business List */}
      <ExploreBusinessList businessList={businessList} />
    </View>
  );
};

export default explore;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontFamily: "Inter-bold",
    fontSize: 28,
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 12,
    marginVertical: 12,
    marginTop: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: PRIMARY,
  },
  input: {
    fontFamily: "Inter",
    fontSize: 16,
    flex: 1,
  },
});
