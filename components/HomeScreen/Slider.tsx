import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";

const Slider = () => {
  const [sliderList, setSliderList] = useState<any[]>([]);
  useEffect(() => {
    getSliderList();
  }, []);

  const getSliderList = async () => {
    const q = query(collection(db, "Slider"));
    const querySnapshot = await getDocs(q);
    let data: any[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    setSliderList(data);
  };
  return (
    <View>
        <Text style={styles.sliderText}># Special For You</Text>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.sliderList}
        renderItem={({ item, index }) => (
          <Image source={{ uri: item.imageUrl }} style={styles.sliderImage} />
        )}
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  sliderText: {
    fontFamily: "Inter-bold",
    fontSize: 20,
    paddingLeft: 20,
    paddingTop: 20,
    marginBottom: 8
  },
  sliderImage: {
    width: 300,
    height: 160,
    borderRadius: 16,
    marginRight: 16
  },
  sliderList: {
    paddingLeft: 20
  }
});
