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
import { useContext } from "react";
import { AudioContext } from "../context/AudioContext";
import BackBar from "../components/BackBar";

import Slider from "@react-native-community/slider";
import {
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Player = () => {
  const { isPlaying, currentAudio, playbackPosition } =
    useContext(AudioContext);

  //hàm tính value cho thanh slider
  const convertValueSlider = () => {
    if (posTime !== null && contextAudio.audioState.currentDuration !== null)
      return posTime / contextAudio.audioState.currentDuration;
    return 0;
  };
  // hàm chuyển đổi định dạng thời gian
  const convertTime = (milliseconds) => {
    if (milliseconds) {
      //const hours = Math.floor(milliseconds / 3600000);
      const minute = Math.floor((milliseconds % 3600000) / 60000);
      const sec = Math.floor(((milliseconds % 360000) % 60000) / 1000);
      if (parseInt(minute) < 10 && sec < 10) return `0${minute}:0${sec}`;
      if (sec == 60)
        return parseInt(minute) + 1 < 10
          ? `0${parseInt(minute) + 1}:00`
          : `${parseInt(minute) + 1}:00`;
      if (parseInt(minute) < 10) return `0${minute}:${sec}`;
      if (sec < 10) return `${minute}:0${sec}`;
      return `${minute}:${sec}`;
    }
    return `00:00`;
  };

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
        thumbTintColor="#ff8216"
        minimumTrackTintColor="#ff8216"
      ></Slider>
      <View
        style={{
          paddingHorizontal: 25,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "500" }}>00:00</Text>
        <Text style={{ fontWeight: "500" }}>2:00</Text>
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
