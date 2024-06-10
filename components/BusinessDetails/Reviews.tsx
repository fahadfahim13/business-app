import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import { Colors, PRIMARY } from "@/constants/Colors";

const Reviews = (props: { business: any }) => {
  const { business } = props;
  const [rating, setRating] = useState("4.5");
  const [review, setReview] = useState("");
  const ratingCompleted = (r: string) => {
    setRating(r);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reviews</Text>
      <Rating
      imageSize={24}
        showRating={false}
        onFinishRating={ratingCompleted}
        style={{ paddingVertical: 10 }}
      />
      <TextInput
        placeholder="Write your review..."
        numberOfLines={4}
        style={styles.reviewText}
        onChangeText={(text: string) => setReview(text)}
      />
      <TouchableOpacity style={{...styles.submitButton,
        backgroundColor: review !== '' ? PRIMARY : '#A3A6FF',
      }}
      disabled={review === ''}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FFF",
  },
  heading: {
    fontSize: 28,
    fontFamily: "Inter-bold",
  },
  reviewText: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    borderColor: Colors.light.tabIconSelected,
    textAlignVertical: "top",
  },
  submitButton: {
    marginTop: 12,
    padding: 12,
    borderRadius: 16
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 16,
  }
});
