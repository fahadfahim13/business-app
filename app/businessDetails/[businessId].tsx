import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { PRIMARY } from "@/constants/Colors";
import Intro from "@/components/BusinessDetails/Intro";
import ActionButtons from "@/components/BusinessDetails/ActionButtons";
import About from "@/components/BusinessDetails/About";

const BusinessDetailsFromId = () => {
  const { businessId } = useLocalSearchParams();
  const [details, setDetails] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getBusinessDetailById();
  }, []);

  const getBusinessDetailById = async () => {
    const docRef = doc(db, "BusinessList", businessId?.toString() ?? "");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setDetails(docSnap.data());
    } else {
      console.log("No such document!!");
    }
    setLoading(false);
  };
  return (
    <View>
      {loading ? (
        <ActivityIndicator
          size={"large"}
          color={PRIMARY}
          style={styles.loader}
        />
      ) : (
        <View>
          <Intro business={{ id: businessId, ...details }} />
          <ActionButtons />
          <About />
        </View>
      )}
    </View>
  );
};

export default BusinessDetailsFromId;

const styles = StyleSheet.create({
  loader: {
    marginTop: "80%",
  },
});
