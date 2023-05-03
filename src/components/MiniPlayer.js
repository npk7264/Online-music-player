import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { AudioContext } from "../context/AudioContext";
import { ThemeContext } from "../context/ThemeContext";

const MiniPlayer = () => {
  const navigation = useNavigation();
  const { currentAudio, isPlaying } = useContext(AudioContext);
  const { colors } = useContext(ThemeContext);

  return (
    <View
      style={{ backgroundColor: colors.background }}>
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
          source={require("../../assets/poster_music.png")}
        />
        <Text
          style={{
            marginHorizontal: 10,
            flex: 1,
            fontSize: 16,
            color: colors.text
          }}
          numberOfLines={1}
        >
          {currentAudio.name + " - " + currentAudio.singer}
        </Text>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            justifyContent: "center",
          }}
        >
          <Ionicons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={30}
            color="#ff973e"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
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
