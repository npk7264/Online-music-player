import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useState, useContext, } from "react";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

import { AudioContext } from "../context/AudioContext";
import { selectSong } from "../utils/AudioController";
import { ThemeContext } from "../context/ThemeContext";

const SongItem = (props) => {
  const contextAudio = useContext(AudioContext);
  const { colors } = useContext(ThemeContext);
  const [isPlay, setIsPlay] = useState(false);
  const handlePress = () => {
    setIsPlay(!isPlay);
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.background }]}
      onPress={async () => await selectSong(contextAudio, props.info)}
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
          <Image source={{ uri: props.info.image }} style={styles.poster} />

          {/* Info */}
          <View style={{ flex: 1, paddingRight: 10 }}>
            <Text
              style={{ fontSize: 18, color: colors.text }}
              numberOfLines={1}
            >
              {props.info.name}
            </Text>
            <Text style={{ fontSize: 16, color: "gray" }} numberOfLines={1}>
              {props.info.singer?.name}
              {/* {console.log(props.info.singer)} */}
            </Text>
          </View>
        </View>

        {/* Button */}
        {/* <View style={styles.buttonContainter}> */}
        {/* PLAY/PAUSE */}
        {/* <Ionicons
            name={!isPlay ? "play-circle" : "pause"}
            size={30}
            color={colors.primary}
          /> */}
        {/* OPTION */}
        <TouchableOpacity onPress={props.onPressOptionModal}>
          <Ionicons name="ellipsis-vertical" size={20} color={colors.text} />
        </TouchableOpacity>
        {/* </View> */}
      </View>
    </TouchableOpacity>
  );
};
export default SongItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: "100%",
    height: 70,
    paddingVertical: 5,
    paddingHorizontal: 20,
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
