import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "../context/ThemeContext";
import { FontAwesome } from "@expo/vector-icons";

const BackBar = ({ title, isSearch }) => {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);
  return (
    <View style={[styles.backBar, { backgroundColor: colors.background }]}>
      {/* title */}
      <View style={styles.container}>
        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <FontAwesome name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {title}
        </Text>
      </View>
      {/* search button */}
      {isSearch && (
        <TouchableOpacity onPress={() => {}}>
          <FontAwesome
            name="search"
            size={24}
            color={colors.text}
          ></FontAwesome>
        </TouchableOpacity>
      )}
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
    height: 60,
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
