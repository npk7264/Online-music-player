import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import { FontAwesome } from "@expo/vector-icons";

const BackBar = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.backBar}>
      {/* title */}
      <View style={styles.container}>
        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      {/* search button */}
      <TouchableOpacity onPress={() => {}}>
        <FontAwesome name="search" size={24}></FontAwesome>
      </TouchableOpacity>
    </View>
  );
};

export default BackBar;

const styles = StyleSheet.create({
  backBar: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 20,
    paddingVertical: 10,
    height: 60
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 27,
    fontWeight: "500",
  },
});
