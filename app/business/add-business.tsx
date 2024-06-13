import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Colors, PRIMARY } from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "@/config/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";
import uuid from "uuid";

const AddBusiness = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [catList, setCatList] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: "",
    address: "",
    website: "",
    about: "",
    contact: "",
    category: "",
    imageUrl: "",
  });

  const { user } = useUser();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Add new Business",
    });
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    const q = query(collection(db, "collections"));
    const querySnapshot = await getDocs(q);
    let d: any[] = [];
    querySnapshot.forEach((doc) => {
      d.push({ id: doc.id, ...doc.data() });
    });
    setCatList(d);
  };

  const onAddNewBusiness = async () => {
    setLoading(true);
    if (image) {
      const filename = Date.now().toString() + ".jpg";
      const resp = await fetch(image);
      const blob = await resp.blob();

      const storageRef = ref(storage, "business-app/businesses/" + filename);

      // 'file' comes from the Blob or File API

      console.log("Uploading file");
      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log("Uploaded a blob or file!");
        getDownloadURL(storageRef).then(async (url) => {
          console.log(url);
          await saveBusinessDetails(url);
        });
      });
    } else {
      await saveBusinessDetails();
    }
  };

  const saveBusinessDetails = async (url?: string) => {
    if (url) setForm((prev) => ({ ...prev, imageUrl: url }));
    console.log("Inside save business details");
    try {
      const n = Date.now().toString();
      console.log(n);
      const res = await addDoc(collection(db, "BusinessList"), {
        ...form,
        imageUrl: url ?? "",
        reviews: [],
        username: user?.fullName ?? "",
        userEmail: user?.emailAddresses[0]?.emailAddress ?? "",
      });
      console.log("Business added!");
      console.log(res);
      setLoading(false);
      ToastAndroid.show("Successfully Added Business!", ToastAndroid.BOTTOM);
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };

  const onImageClick = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>AddBusiness</Text>
      <Text style={styles.subheader}>
        Fill all details in order to add new business.
      </Text>

      <TouchableOpacity style={styles.imageContainer} onPress={onImageClick}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Image
            source={require("../../assets/images/placeholder.png")}
            style={styles.imageUpload}
          />
        )}
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name..."
          onChangeText={(v) => setForm((prev) => ({ ...prev, name: v }))}
          style={styles.nameInput}
        />
        <TextInput
          placeholder="Contact..."
          onChangeText={(v) => setForm((prev) => ({ ...prev, contact: v }))}
          style={styles.nameInput}
        />
        <TextInput
          placeholder="Address..."
          onChangeText={(v) => setForm((prev) => ({ ...prev, address: v }))}
          style={styles.nameInput}
        />
        <TextInput
          placeholder="Website..."
          onChangeText={(v) => setForm((prev) => ({ ...prev, website: v }))}
          style={styles.nameInput}
        />
        <TextInput
          placeholder="About..."
          style={styles.nameInput}
          numberOfLines={4}
          multiline
          onChangeText={(v) => setForm((prev) => ({ ...prev, about: v }))}
        />
        <View style={styles.selectInput}>
          <RNPickerSelect
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, category: value }))
            }
            items={
              catList.length > 0
                ? catList.map((val: any) => ({
                    label: val?.name ?? "",
                    value: val?.name,
                  }))
                : []
            }
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        disabled={loading}
        onPress={onAddNewBusiness}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.addButtonText}>Add Business</Text>
        )}
      </TouchableOpacity>
      <View style={styles.container}></View>
    </ScrollView>
  );
};

export default AddBusiness;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 12,
  },
  header: {
    fontFamily: "Inter-bold",
    fontSize: 24,
  },
  subheader: {
    fontFamily: "Inter",
    fontSize: 16,
    color: Colors.dark.background,
  },
  imageContainer: {
    marginTop: 20,
  },
  imageUpload: {
    width: 100,
    height: 100,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 16,
  },
  inputContainer: {
    marginTop: 16,
  },
  nameInput: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 16,
    marginVertical: 8,
    fontSize: 16,
    backgroundColor: "#FFF",
    borderColor: PRIMARY,
  },
  selectInput: {
    padding: 8,
    borderWidth: 1,
    borderRadius: 16,
    marginVertical: 8,
    fontSize: 16,
    backgroundColor: "#FFF",
    borderColor: PRIMARY,
    marginBottom: 16,
  },
  addButton: {
    padding: 20,
    backgroundColor: PRIMARY,
    borderRadius: 16,
  },
  addButtonText: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Inter-bold",
  },
});
