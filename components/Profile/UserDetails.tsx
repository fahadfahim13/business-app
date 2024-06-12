import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

const UserDetails = () => {
  const { user } = useUser();
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: user?.imageUrl,
        }}
        style={styles.userImage}
      />
      <Text style={styles.userName}>{user?.fullName}</Text>
      <Text style={styles.userEmail}>
        {user?.primaryEmailAddress?.emailAddress}
      </Text>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  userName: {
    fontFamily: "Inter-bold",
    fontSize: 24,
  },
  userEmail: {
    fontFamily: "Inter-light",
    fontSize: 16,
  },
});
