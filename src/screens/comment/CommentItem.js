import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { auth } from "../../services/firebaseConfig";

const CommentItem = ({ id, user, content, avatar, time, deleteComment }) => {
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
        <TouchableOpacity
          style={{
            backgroundColor: colors.frame,
            borderRadius: 15,
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}
          onLongPress={() => {
            if (auth.currentUser.uid == user.id)
              Alert.alert("Xóa bình luận", "Xóa bình luận này", [
                {
                  text: "Đóng",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => deleteComment(id),
                },
              ]);
          }}
        >
          <Text
            style={{ fontSize: 16, fontWeight: "bold", color: colors.text }}
          >
            {user.name}
          </Text>
          <Text style={{ fontSize: 16, color: colors.text }}>{content}</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 13, color: colors.text, paddingLeft: 10 }}>
          {time ? time.toDate().toLocaleString() : new Date().toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({});
