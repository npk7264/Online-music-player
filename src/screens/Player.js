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
  const [currentPosition, setCurrentPositon] = useState("00:00");
  const [isRepeat, setRepeat] = useState(isLooping);
  const [isLike, setLike] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);

  //hàm tính value cho thanh slider
  const convertValueSlider = () => {
    if (playbackPosition !== null && playbackDuration !== null) {
      return playbackPosition / playbackDuration;
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
      console.log(docSnap.data().favorite);
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
      setFavoriteList([...favoriteList, currentAudio.id]);
      await updateDoc(docRef, {
        favorite: [...favoriteList, currentAudio.id],
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

  useEffect(() => {
    setCurrentPositon(convertTime(playbackPosition));
  }, [convertValueSlider()]);

  useEffect(() => {
    setRepeat(isLooping);
    fetchFavorite();
  }, [currentAudio]);

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
        value={convertValueSlider()}
        thumbTintColor="#ff8216"
        minimumTrackTintColor="#ff8216"
        onValueChange={(value) => {
          setCurrentPositon(convertTime(value * context.playbackDuration));
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
            color="#333"
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
            color="#333"
          />
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
        <TouchableOpacity
          style={styles.controllerItem}
          onPress={() => {
            changeSong(context, "previous");
          }}
        >
          <AntDesign name="stepbackward" size={40} color="#333" />
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
            color="#ff8216"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controllerItem}
          onPress={() => {
            changeSong(context, "next");
          }}
        >
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
