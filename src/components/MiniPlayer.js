import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

const MiniPlayer = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        height: 60,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      onPress={() => {
        navigation.navigate("Player");
      }}
    >
      <Image
        style={{
          height: 40,
          width: 40,
          backgroundColor: "white",
          borderRadius: 15,
        }}
        source={require("../../assets/poster_music.png")}
      />
      <Text
        style={{
          marginHorizontal: 10,
          flex: 1,
          fontSize: 16,
        }}
        numberOfLines={1}
      >
        Nang am xa dan - Son Tung MTP
      </Text>
      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          justifyContent: "center",
        }}
      >
        <Ionicons name={"play-circle"} size={30} color="#ff973e" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MiniPlayer;

const styles = StyleSheet.create({});
