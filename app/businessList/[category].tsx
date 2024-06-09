import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import BusinessListCard from "@/components/BusinessList/BusinessListCard";
import { Colors, PRIMARY } from "@/constants/Colors";

const BusinessListByCategory = () => {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();

  const [busList, setBuslist] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: `${category}`,
    });
    setLoading(true);
    getBusinessList();
  }, []);

  const getBusinessList = async () => {
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    let data: any[] = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      data.push(doc.data());
    });
    setBuslist(data);
    setLoading(false);
  };

  return (
    <View>
      {busList.length > 0 && loading === false ? (
        <FlatList
          data={busList}
          refreshing={loading}
          onRefresh={getBusinessList}
          renderItem={({ item, index }) => (
            <BusinessListCard business={item} key={index} />
          )}
        />
      ) : loading ? (
        <ActivityIndicator
          size={"large"}
          color={PRIMARY}
          style={styles.activity}
        />
      ) : (
        <Text style={styles.notFound}>No Business Found!!</Text>
      )}
    </View>
  );
};

export default BusinessListByCategory;

const styles = StyleSheet.create({
  notFound: {
    fontSize: 20,
    fontFamily: "Inter-bold",
    color: Colors.light.tint,
    textAlign: "center",
    marginTop: "80%",
  },
  activity: {
    marginTop: "80%",
  },
});
