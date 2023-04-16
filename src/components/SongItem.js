import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const SongItem = (props) => {
  const [isPlay, setIsPlay] = useState(false);
  let handlePress = () => {
    setIsPlay(!isPlay);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.content}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* Image */}
          <Image
            source={require("../../assets/temp.jpg")}
            style={styles.poster}
          />

          {/* Info */}
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text style={{ fontSize: 18 }} numberOfLines={1}>
              {props.song}
            </Text>
            <Text style={{ fontSize: 16, color: "gray" }}>{props.singer}</Text>
          </View>
        </View>

        {/* Button */}
        <View style={styles.buttonContainter}>
          {/* PLAY/PAUSE */}
          <Ionicons
            name={!isPlay ? "play-circle" : "pause"}
            size={30}
            color="#ff973e"
          />
          {/* OPTION */}
          <TouchableOpacity onPress={props.onPressOptionModal}>
            <Ionicons name="ellipsis-vertical" size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default SongItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
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
  },
  buttonContainter: {
    width: "20%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
