import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import React, { useState } from "react";
import { AirbnbRating, Rating } from "react-native-ratings";
import { Colors, PRIMARY } from "@/constants/Colors";
import { db } from "@/config/FirebaseConfig";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";

const Reviews = (props: { business: any }) => {
  const { business } = props;
  const { user } = useUser();
  const [rating, setRating] = useState("4.5");
  const [review, setReview] = useState("");
  const ratingCompleted = (r: string) => {
    setRating(r);
  };

  const onSubmit = async () => {
    const data = JSON.stringify({
      rating: rating,
      comment: review,
      userId: user?.id,
      useFullname: user?.fullName,
      userImage: user?.imageUrl,
      userEmail: user?.emailAddresses,
    });
    const docRef = doc(db, "BusinessList", business?.id ?? "");
    await updateDoc(docRef, {
      reviews: arrayUnion(JSON.parse(data)),
    });
    ToastAndroid.show("Review Added Successfully!!", ToastAndroid.TOP);
    setReview("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reviews</Text>
      <View>
        <Rating
          imageSize={24}
          showRating={false}
          jumpValue={0.5}
          fractions={1}
          onFinishRating={ratingCompleted}
          style={{ paddingVertical: 10 }}
        />
        <TextInput
          placeholder="Write your review..."
          numberOfLines={4}
          style={styles.reviewText}
          onChangeText={(text: string) => setReview(text)}
        />
        <TouchableOpacity
          style={{
            ...styles.submitButton,
            backgroundColor: review !== "" ? PRIMARY : "#A3A6FF",
          }}
          disabled={review === ""}
          onPress={onSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        {/* Display Previous Reviews */}
        <View style={styles.ratingListContainer}>
          {business?.reviews?.map((item: any, index: number) => (
            <View key={index} style={styles.ratingItemContainer}>
              <Image
                source={{ uri: item?.userImage }}
                style={styles.reviewImage}
              />
              <View style={styles.ratingTextContainer}>
                <Text style={styles.ratingUserName}>{item.useFullname}</Text>
                <AirbnbRating
                  size={16}
                  showRating={false}
                  defaultRating={item.rating}
                  ratingContainerStyle={{ alignItems: 'flex-start' }}
                />
                <Text>{item.comment}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
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
    borderRadius: 16,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 16,
  },
  reviewImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  ratingListContainer: {
    marginVertical: 12
  },
  ratingItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    borderColor: Colors.light.tabIconSelected,
    borderWidth: 1,
    borderRadius: 12,
    padding: 8
  },
  ratingTextContainer: {
    display: 'flex',
    flex: 1
  },
  ratingUserName: {
    fontFamily: 'Inter-bold',
    fontSize: 16,
  }
});
