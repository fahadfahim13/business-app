import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { PRIMARY } from "@/constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import CategoryItem from "./CategoryItem";

const Category = () => {
  const [catlist, setCatlist] = useState<any[]>([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    const q = query(collection(db, "collections"));
    const querySnapshot = await getDocs(q);

    let data: any[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    setCatlist(data);
  };

  const onCategoryPress = (category: any) => {
    console.log(category.name)
  }

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.mainHeader}>Category</Text>
        <Text style={styles.headerButton}>See All</Text>
      </View>
      <FlatList
        data={catlist}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.categoryList}
        renderItem={({ item, index }) => (
          <CategoryItem category={item} key={index}
          onCategoryPress={onCategoryPress} />
        )}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
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
  categoryList: {
    marginLeft: 20,
  }
});
