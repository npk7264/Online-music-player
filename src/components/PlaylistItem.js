import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useContext } from "react";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext.js";
import { useNavigation } from "@react-navigation/native";

const PlaylistItem = ({ type, name, id, numSong }) => {
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 70,
        paddingVertical: 5,
        paddingHorizontal: 20,
        backgroundColor: colors.background,
      }}
      onPress={() => {
        if (type == "Favorite") navigation.navigate("Favorite");
        else if (type == "Recent") navigation.navigate("Recent");
        else navigation.navigate("DetailPlaylist", { id });
      }}
    >
      <View style={styles.content}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* Image */}
          <View style={styles.poster}>
            {type === "Favorite" && (
              <AntDesign name="heart" size={24} color="#ff8216" />
            )}
            {type === "Recent" && (
              <FontAwesome name="history" size={24} color="#ff8216" />
            )}
            {type !== "Favorite" && type !== "Recent" && (
              <MaterialIcons name="queue-music" size={24} color="#ff8216" />
            )}
          </View>

          {/* Info */}
          <View style={{ flex: 1 }}>
            <Text
              style={{ fontSize: 18, color: colors.text }}
              numberOfLines={1}
            >
              {name}
            </Text>
            <Text style={{ fontSize: 16, color: "gray" }}>{numSong} Bài hát</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default PlaylistItem;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  poster: {
    width: 50,
    height: 50,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: "#f5f5f6",
    alignItems: "center",
    justifyContent: "center",
  },
});
