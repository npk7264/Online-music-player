import { StyleSheet, Text, View, Image } from "react-native";
import { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const CommentItem = ({ userName, content, avatar, time }) => {
  const { colors } = useContext(ThemeContext);

  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 5,
        paddingHorizontal: 20,
      }}
    >
      <Image
        source={{ uri: avatar }}
        style={{
          width: 50,
          height: 50,
          backgroundColor: colors.primary,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: "#e9edf0",
          marginRight: 10,
        }}
      />
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: colors.frame,
            borderRadius: 15,
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{ fontSize: 16, fontWeight: "bold", color: colors.text }}
          >
            {userName}
          </Text>
          <Text style={{ fontSize: 16, color: colors.text }}>{content}</Text>
        </View>

        <Text style={{ fontSize: 13, color: colors.text, paddingLeft: 10 }}>
          {time.toDate().toDateString()}
        </Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({});
