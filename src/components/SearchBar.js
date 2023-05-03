import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../context/ThemeContext";

import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const SearchBar = ({ title }) => {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);
  return (
    <View style={[styles.searchBar, { backgroundColor: colors.background }]}>
      {/* title */}
      <View style={styles.container}>
        <FontAwesome5 name="music" size={24} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {title}
        </Text>
      </View>
      {/* search button */}

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Search");
        }}
      >
        <FontAwesome name="search" size={24} color={colors.text}></FontAwesome>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    height: 60,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    paddingLeft: 20,
    fontSize: 27,
    fontWeight: "bold",
  },
});
