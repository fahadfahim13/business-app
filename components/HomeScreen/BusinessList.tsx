import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { PRIMARY } from "@/constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import BusinessListItem from "./BusinessListItem";

const BusinessList = () => {
  const [busList, setBuslist] = useState<any[]>([]);

  useEffect(() => {
    getBusinessList();
  }, []);

  const getBusinessList = async () => {
    const q = query(collection(db, "BusinessList"));
    const querySnapshot = await getDocs(q);
    let data: any[] = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      data.push(doc.data());
    });
    setBuslist(data);
  };

  const onBusinessClick = (business: any) => {
    console.log(business);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.mainHeader}>Popular Businesses</Text>
        <Text style={styles.headerButton}>See All</Text>
      </View>
      <FlatList
        data={busList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <BusinessListItem
            key={index}
            business={item}
            onBusinessPress={onBusinessClick}
          />
        )}
      />
    </View>
  );
};

export default BusinessList;

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  headerContainer: {
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  mainHeader: {
    fontSize: 20,
    fontFamily: "Inter-bold",
  },
  headerButton: {
    color: PRIMARY,
    fontFamily: "Inter-light",
  },
});
