import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const SongItem = (props) => {
  const [isPlay, setIsPlay] = useState(false);
  let handlePress = () => {
    setIsPlay(!isPlay);
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}>
      <View style={styles.content}>
        <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require("../../assets/poster_music.png")}
            style={styles.poster} >
          </Image>
          <View
            style={styles.inf}
          >
            <Text style={styles.song} numberOfLines={1}>{props.song}</Text>
            <Text style={styles.artist}>{props.singer}  |  {props.time}</Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons
            name={!isPlay ? "play-circle" : "pause"}
            size={30}
            color='#ff973e'
            style={styles.playIcon} />
          <TouchableOpacity>
            <Ionicons
              name="ellipsis-vertical"
              size={20} />
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
    justifyContent: "space-around",
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  poster: {
    width: 50,
    height: 50,
    marginRight: 20,
    borderRadius: 15
  },
  inf: {
    height: "100%",
    justifyContent: 'center',
  },
  song: {
    fontSize: 16,

  },
  artist: { fontSize: 14, color: "gray", },
  playIcon: {
    marginLeft: '35%',
    marginRight: 20,
  },
});