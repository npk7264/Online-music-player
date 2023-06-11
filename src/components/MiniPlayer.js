import React, { useContext, useMemo } from "react";
import { AudioContext } from "../context/AudioContext";
import { ThemeContext } from "../context/ThemeContext";
import { selectSong } from "../utils/AudioController";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MiniPlayer = () => {
  const contextAudio = useContext(AudioContext);
  const { currentAudio, isPlaying } = contextAudio;
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation();

  const memoizedMiniPlayer = useMemo(() => {

    return (
      <View style={{ backgroundColor: colors.background }}>
        <TouchableOpacity
          style={[styles.container, { borderColor: colors.frame }]}
          onPress={() => {
            navigation.navigate("Player");
          }}
        >
          <Image
            style={{
              height: 40,
              width: 40,
              backgroundColor: "white",
              borderRadius: 15,
            }}
            source={{ uri: currentAudio.image }}
          />
          <Text
            style={{
              marginHorizontal: 10,
              flex: 1,
              fontSize: 16,
              color: colors.text,
            }}
            numberOfLines={1}
          >
            {currentAudio.name + " - " + currentAudio.singer.name}
          </Text>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={async () => await selectSong(contextAudio, currentAudio)}
          >
            <Ionicons
              name={isPlaying ? "pause-circle" : "play-circle"}
              size={40}
              color="#ff973e"
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }, [currentAudio, isPlaying, colors, navigation]);

  return memoizedMiniPlayer;
};

export default MiniPlayer;

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 0.5,
    borderRadius: 10,
  },
});
