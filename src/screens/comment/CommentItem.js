import { StyleSheet, Text, View } from "react-native";
import { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const CommentItem = ({userName, content }) => {
  const { colors } = useContext(ThemeContext);

  return (
    <View
      style={{
        flexDirection: "row",
        height: 70,
        marginVertical: 5,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          width: 50,
          height: 50,
          backgroundColor: "#ccc",
          borderRadius: 50,
          marginRight: 10,
        }}
      ></View>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.frame,
          borderRadius: 15,
          paddingVertical: 5,
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: colors.text }}>
          {userName}
        </Text>
        <Text style={{ fontSize: 18, color: colors.text }}>{content}</Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({});
