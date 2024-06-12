import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { PRIMARY } from "@/constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import CategoryItem from "./CategoryItem";
import { useRouter } from "expo-router";

const Category = (props: {explore?: boolean;
  onCategorySelect?: (name: string) => void;
}) => {
  const {explore = false, onCategorySelect} = props;
  const [catlist, setCatlist] = useState<any[]>([]);
  const router = useRouter();

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
    if(!explore) {
      onCategorySelect?.(category.name);
    } else{
      router.push(`/businessList/${category.name}`);
    }
  }

  return (
    <View style={styles.container}>
      {explore && <View style={styles.headerContainer}>
        <Text style={styles.mainHeader}>Category</Text>
        <Text style={styles.headerButton}>See All</Text>
      </View>}
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
  container: {
    marginLeft: 20,
  },
  headerContainer: {
    padding: 20,
    marginLeft: -20,
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
    marginTop: 8,
  }
});
