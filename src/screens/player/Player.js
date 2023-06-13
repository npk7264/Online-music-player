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
import { AudioContext } from "../../context/AudioContext";
import BackBar from "../../components/BackBar";

import Slider from "@react-native-community/slider";
import {
  FontAwesome,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { convertTime } from "../../utils/helper";
import { selectSong, changeSong } from "../../utils/AudioController";
import { useNavigation } from "@react-navigation/native";

import { auth, db } from "../../services/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

import { ThemeContext } from "../../context/ThemeContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Player = () => {
  const context = useContext(AudioContext);
  const {
    userId,
    isPlaying,
    isLooping,
    soundObj,
    playbackObj,
    currentAudio,
    playbackPosition,
    playbackDuration,
    updateState,
    songData,
  } = context;
  const [currentPosition, setCurrentPositon] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [isRepeat, setRepeat] = useState(isLooping);
  const [isLike, setLike] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  const navigation = useNavigation();

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
  }, [currentAudio, soundObj]);

  return (

    <SafeAreaView style={{ backgroundColor: colors.background, flex: 1 }}>
      <StatusBar></StatusBar>
      <BackBar />
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
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
            {currentAudio.singer.name}
          </Text>
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: "space-evenly" }}>
        {/* Slider */}
        <View>
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
        </View>

        <View>
          {/* Like, playlist */}
          <View
            style={{
              // marginTop: 10,
              paddingHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
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
            <TouchableOpacity style={styles.controllerItem}>
              <MaterialCommunityIcons
                name="playlist-plus"
                size={25}
                color={colors.text}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.controllerItem}
              onPress={() => {
                navigation.navigate("Comment");
              }}
            >
              <MaterialCommunityIcons
                name="comment-text-outline"
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
                selectSong(context, currentAudio, songData);
              }}
            >
              <FontAwesome
                name={isPlaying ? "pause-circle" : "play-circle"}
                size={60}
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
        </View>

        {/* Lyric */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Lyric");
          }}
        >
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              color: colors.text,
              fontSize: 20,
            }}
          >
            Lời bài hát
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Player;

const styles = StyleSheet.create({
  thumbnail: {
    marginTop: 20,
    width: windowWidth - 160,
    height: windowWidth - 160,
    backgroundColor: "#ff8216",
    borderRadius: 25,
  },
  controllerItem: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  sliderBar: {
    width: windowWidth - 20,
    height: 30,
    alignSelf: "center",
  },
  viewLyric: {
    // height: 30,
    // width: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonLyric: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 40,
  },
});
