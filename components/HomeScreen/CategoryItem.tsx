import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ICON_BG } from "@/constants/Colors";

const CategoryItem = (props: { category: any;
    onCategoryPress: (category: any) => void;
 }) => {
  const { category, onCategoryPress } = props;
  return (
    <TouchableOpacity onPress={() => onCategoryPress(category)}>
      <View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: category.icon }} style={styles.icon} />
        </View>
        <Text style={styles.categoryName}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  imageContainer: {
    padding: 16,
    backgroundColor: ICON_BG,
    borderRadius: 100,
    marginRight: 16,
  },
  icon: {
    width: 48,
    height: 48,
  },
  categoryName: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: "Inter-light",
    textAlign: "center",
  },
});
