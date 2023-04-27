import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useState, useContext } from "react";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

import { AudioContext } from "../context/AudioContext";
import { selectSong } from "../utils/AudioController";

const SongItem = (props) => {
  const contextAudio = useContext(AudioContext);

  const [isPlay, setIsPlay] = useState(false);
  const handlePress = () => {
    setIsPlay(!isPlay);
  };

  const audioPress = () => {
    selectSong(contextAudio, props.info);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={audioPress}>
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
              {props.info.name}
            </Text>
            <Text style={{ fontSize: 16, color: "gray" }} numberOfLines={1}>
              {props.info.singer}
            </Text>
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
