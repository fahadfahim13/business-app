import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, PRIMARY } from "@/constants/Colors";
import { useNavigation } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import BusinessListCard from "@/components/BusinessList/BusinessListCard";

const MyBusinesses = () => {
  const navigation = useNavigation();
  const { user } = useUser();

  const [busList, setBuslist] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: `My Businesses`,
    });
    getBusinessList();
  }, []);

  const getBusinessList = async () => {
    setLoading(true);
    const q = query(
      collection(db, "BusinessList"),
      where("userEmail", "==", user?.emailAddresses[0]?.emailAddress)
    );
    const querySnapshot = await getDocs(q);
    let data: any[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc?.id, ...doc.data() });
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

export default MyBusinesses;

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
