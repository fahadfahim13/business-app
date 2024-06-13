import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { PRIMARY } from "@/constants/Colors";
import Intro from "@/components/BusinessDetails/Intro";
import ActionButtons from "@/components/BusinessDetails/ActionButtons";
import About from "@/components/BusinessDetails/About";
import Reviews from "@/components/BusinessDetails/Reviews";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ScrollView } from "react-native-virtualized-view";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

const BusinessDetailsFromId = () => {
  const router = useRouter();
  const { businessId } = useLocalSearchParams();
  const [details, setDetails] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();

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

  const deleteBusiness = async () => {
    await deleteDoc(doc(db, "BusinessList", businessId?.toString() ?? ""));
    router.push('/profile');
    ToastAndroid.show('Successfully deleted business!', ToastAndroid.LONG);
  }

  const onDelete = async () => {
    Alert.alert(
      "Are you sure?",
      "Do you want to delete this business?",
      [
        {
          text: "Delete",
          style: "destructive",
          onPress: deleteBusiness
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <ScrollView>
      {loading ? (
        <ActivityIndicator
          size={"large"}
          color={PRIMARY}
          style={styles.loader}
        />
      ) : (
        <View>
          <Intro business={{ id: businessId, ...details }} />

          <ActionButtons business={{ id: businessId, ...details }} />
          <About business={{ id: businessId, ...details }} />
          <Reviews business={{ id: businessId, ...details }} />
          {user?.emailAddresses[0]?.emailAddress === details.userEmail && (
            <View style={styles.deleteContainer}>
              <TouchableOpacity onPress={onDelete}
              style={styles.deleteButtonContainer}>
                <Text style={styles.deleteText}>
                  Delete{" "}
                  <Ionicons name="trash-bin-outline" size={24} color="red" />
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default BusinessDetailsFromId;

const styles = StyleSheet.create({
  loader: {
    marginTop: "80%",
  },
  deleteContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    marginTop: -20,
    borderColor: "red",
  },
  deleteButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#FFF",
    padding: 16,
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 16,
  },
  deleteText: {
    color: "red",
    textAlign: "center",
    fontFamily: "Inter-bold",
    fontSize: 20,
  },
});
