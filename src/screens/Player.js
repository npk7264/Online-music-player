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
import { convertTime } from "../utils/helper";
import { selectSong, changeSong } from "../utils/AudioController";

import { auth, db } from "../services/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

import { ThemeContext } from "../context/ThemeContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Player = () => {
  const context = useContext(AudioContext);
  const {
    userId,
    isPlaying,
    isLooping,
    playbackObj,
    currentAudio,
    playbackPosition,
    playbackDuration,
    updateState,
  } = context;
  const [currentPosition, setCurrentPositon] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [isRepeat, setRepeat] = useState(isLooping);
  const [isLike, setLike] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);

  const { colors } = useContext(ThemeContext);

  //hàm tính value cho thanh slider
  const convertValueSlider = () => {
    if (currentPosition !== null && playbackDuration !== null) {
      return currentPosition / playbackDuration;
    }
    return 0;
  };

  // lặp bài hát
  const repeat = async (flag) => {
    const status = await playbackObj.setIsLoopingAsync(flag);
    updateState(context, {
      soundObj: status,
      isLooping: flag,
    });
  };

  // fetch favorite songs
  const fetchFavorite = async () => {
    const docRef = doc(db, "users/" + userId);
    try {
      const docSnap = await getDoc(docRef);
      // console.log(docSnap.data().favorite);
      setFavoriteList(docSnap.data().favorite);
      setLike(docSnap.data().favorite.includes(currentAudio.id));
    } catch (error) {
      console.log("Fail to fetch favorite songs", error);
    }
  };

  // save to favorite
  const saveFavorite = async () => {
    const docRef = doc(db, "users/" + userId);
    try {
      setFavoriteList([currentAudio.id, ...favoriteList]);
      await updateDoc(docRef, {
        favorite: [currentAudio.id, ...favoriteList],
      });
    } catch (e) {
      alert("Failed to save favorite song!", e);
    }
  };

  // remove from favorite
  const removeFavorite = async () => {
    const docRef = doc(db, "users/" + userId);
    try {
      const newFavoriteList = favoriteList.filter((item) => {
        return item != currentAudio.id;
      });
      setFavoriteList(newFavoriteList);
      await updateDoc(docRef, {
        favorite: newFavoriteList,
      });
    } catch (e) {
      alert("Failed to remove favorite song!", e);
    }
  };

  const onPlaybackStatusUpdate = async (status) => {
    if (status.isLoaded) {
      setCurrentPositon(status.positionMillis);
    }
    if (status.didJustFinish && !status.isLooping) {
      console.log("FINISH:", currentAudio);
      await changeSong(context, "next");
    }
  };

  useEffect(() => {
    setCurrentTime(convertTime(currentPosition));
  }, [convertValueSlider()]);

  useEffect(() => {
    playbackObj.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    setRepeat(isLooping);
    fetchFavorite();
  }, [currentAudio]);

  return (
    <SafeAreaView style={{ backgroundColor: colors.background }}>
      <StatusBar></StatusBar>
      <BackBar />
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image style={styles.thumbnail} source={{ uri: currentAudio.image }} />
        {/* Song name */}
        <View
          style={{
            alignItems: "center",
            paddingTop: 10,
            paddingBottom: 5,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: 500, color: colors.text }}>
            {currentAudio.name}
          </Text>
        </View>
        {/* Artist name */}
        <View style={{ paddingBottom: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 400, color: colors.text }}>
            {currentAudio.artists.join(" ft ")}
          </Text>
        </View>
      </View>

      {/* Slider */}
      <Slider
        style={styles.sliderBar}
        minimumValue={0}
        maximumValue={1}
        value={convertValueSlider()}
        thumbTintColor="#ff8216"
        minimumTrackTintColor="#ff8216"
        maximumTrackTintColor={colors.text}
        onValueChange={(value) => {
          setCurrentTime(convertTime(value * context.playbackDuration));
        }}
        onSlidingStart={async () => {
          if (!isPlaying) return;
          try {
            await playbackObj.setStatusAsync({
              shouldPlay: false,
            });
          } catch (error) {
            console.log("error inside onSlidingStart callback", error);
          }
        }}
        onSlidingComplete={async (value) => {
          if (playbackObj === null || !isPlaying) {
            const status = await playbackObj.setPositionAsync(
              Math.floor(value * playbackDuration)
            );
            updateState(context, {
              soundObj: status,
              playbackPosition: status.positionMillis,
            });
            return;
          }
          try {
            const status = await playbackObj.setPositionAsync(
              Math.floor(value * playbackDuration)
            );
            updateState(context, {
              soundObj: status,
              playbackPosition: status.positionMillis,
            });
            await playbackObj.playAsync();
          } catch (error) {
            console.log("error inside onSlidingComplete callback", error);
          }
        }}
      />
      <View
        style={{
          paddingHorizontal: 25,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "500", color: colors.text }}>
          {currentTime}
        </Text>
        <Text style={{ fontWeight: "500", color: colors.text }}>
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
        <TouchableOpacity
          style={styles.controllerItem}
          onPress={() => {
            const flag = !isRepeat;
            setRepeat(flag);
            repeat(flag);
          }}
        >
          <MaterialCommunityIcons
            name={isRepeat ? "repeat-once" : "repeat"}
            size={25}
            color={colors.text}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controllerItem}
          onPress={() => {
            const flag = !isLike;
            setLike(!isLike);
            flag ? saveFavorite() : removeFavorite();
          }}
        >
          <FontAwesome
            name={isLike ? "heart" : "heart-o"}
            size={25}
            color={!isLike ? colors.text : colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controllerItem}>
          <MaterialCommunityIcons
            name="playlist-plus"
            size={25}
            color={colors.text}
          />
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
        <TouchableOpacity
          style={styles.controllerItem}
          onPress={() => {
            changeSong(context, "previous");
          }}
        >
          <AntDesign name="stepbackward" size={40} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controllerItem}
          onPress={() => {
            selectSong(context, currentAudio);
          }}
        >
          <FontAwesome
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={70}
            color={colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controllerItem}
          onPress={() => {
            changeSong(context, "next");
          }}
        >
          <AntDesign name="stepforward" size={40} color={colors.text} />
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
