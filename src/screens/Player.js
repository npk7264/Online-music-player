import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { AudioContext } from "../context/AudioContext";
import BackBar from "../components/BackBar";

import Slider from "@react-native-community/slider";
import {
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { convertTime, convertValueSlider } from "../utils/helper";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Player = () => {
  const {
    isPlaying,
    playbackObj,
    currentAudio,
    playbackPosition,
    playbackDuration,
    updateAudioState,
  } = useContext(AudioContext);
  const [currentPosition, setCurrentPositon] = useState("00:00");

  useEffect(() => {
    setCurrentPositon(convertTime(playbackPosition));
  }, []);

  return (
    <SafeAreaView>
      <StatusBar></StatusBar>
      <BackBar />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          style={styles.thumbnail}
          source={require("../../assets/temp.jpg")}
        />
        {/* Song name */}
        <View
          style={{
            alignItems: "center",
            paddingTop: 10,
            paddingBottom: 5,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: 500 }}>
            {currentAudio.name}
          </Text>
        </View>
        {/* Artist name */}
        <View style={{ paddingBottom: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 400 }}>
            {currentAudio.singer}
          </Text>
        </View>
      </View>

      {/* Slider */}
      <Slider
        style={styles.sliderBar}
        minimumValue={0}
        maximumValue={1}
        value={convertValueSlider(playbackPosition, playbackDuration)}
        thumbTintColor="#ff8216"
        minimumTrackTintColor="#ff8216"
        onValueChange={(value) => {
          setCurrentPositon(convertTime(value * playbackDuration));
        }}
        //////////////////
        onSlidingStart={async () => {
          if (!isPlaying) return;
          try {
            console.log("pause");
            await playbackObj.setStatusAsync({
              shouldPlay: false,
            });
          } catch (error) {
            console.log("error inside onSlidingStart callback", error);
          }
        }}
        //////////////////
        onSlidingComplete={async (value) => {
          if (playbackObj === null || !isPlaying) {
            const status = await playbackObj.setPositionAsync(
              Math.floor(value * playbackDuration)
            );
            updateAudioState({
              soundObj: status,
              playbackPosition: status.positionMillis,
            });
            return;
          }
          try {
            const status = await playbackObj.setPositionAsync(
              Math.floor(value * playbackDuration)
            );
            updateAudioState({
              soundObj: status,
              playbackPosition: status.positionMillis,
            });
            await playbackObj.playAsync();
          } catch (error) {
            console.log("error inside onSlidingComplete callback", error);
          }
        }}
      ></Slider>
      <View
        style={{
          paddingHorizontal: 25,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "500" }}>{currentPosition}</Text>
        <Text style={{ fontWeight: "500" }}>
          {convertTime(playbackDuration)}
        </Text>
      </View>

      {/* Like, playlist */}
      <View
        style={{
          marginTop: 10,
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity style={styles.controllerItem}>
          <MaterialCommunityIcons name={"repeat-once"} size={25} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controllerItem}>
          <FontAwesome name="heart" size={25} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controllerItem}>
          <MaterialCommunityIcons name="playlist-plus" size={25} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Controller */}
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <TouchableOpacity style={styles.controllerItem}>
          <AntDesign name="stepbackward" size={40} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controllerItem}>
          <FontAwesome
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={70}
            color="#ff8216"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controllerItem}>
          <AntDesign name="stepforward" size={40} color="#333" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Player;

const styles = StyleSheet.create({
  thumbnail: {
    marginTop: 20,
    width: windowWidth - 80,
    height: windowWidth - 80,
    backgroundColor: "#ff8216",
    borderRadius: 25,
  },
  controllerItem: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderBar: {
    width: windowWidth - 20,
    height: 40,
    alignSelf: "center",
  },
});
