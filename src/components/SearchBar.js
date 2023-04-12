import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
const SearchBar = () => {
  return (
    <View style={styles.searchBar}>
      <TouchableOpacity
        style={{ marginRight: 20 }}
        onPress={() => {
        }}
      >
        <FontAwesome
          name="search"
          size={24}
        ></FontAwesome>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
});
