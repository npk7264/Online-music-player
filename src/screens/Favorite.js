import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { useState, useContext, useEffect } from "react";

import BackBar from "../components/BackBar";
import MiniPlayer from "../components/MiniPlayer";

import { AudioContext } from "../context/AudioContext";
import { ThemeContext } from "../context/ThemeContext";
import { PlaylistContext } from "../context/PlaylistContext";

import FlatListSong from "../components/FlatListSong";
import { fetchFavorite } from "../utils/FirebaseHandler";
import { useIsFocused } from "@react-navigation/native";

import { Ionicons, FontAwesome } from "@expo/vector-icons";

const Favorite = () => {
  const { userId, currentAudio } = useContext(AudioContext);

  const { favoriteData, setFavoriteData } = useContext(PlaylistContext);
  const { colors, language } = useContext(ThemeContext);
  const [loaded, setLoaded] = useState(favoriteData?.length !== 0);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      const favorite = await fetchFavorite(userId);
      setFavoriteData(favorite);
      setLoaded(true);
    };
    if (favoriteData?.length === 0)
      fetchData();
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar></StatusBar>

      <BackBar title={language.favorite} />

      {!loaded && <ActivityIndicator size="large" color={colors.primary} />}

      {loaded && (
        <View>
          <View style={styles.header}>
            {/* info singer */}
            <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThuEtcKQjwA9Mnq3QaKNTY9hytEDT-80wG4lDTEHYpDB2nKhbH360H8rwZqkx6zuj4hfk&usqp=CAU' }}
              style={styles.poster}
            />
            <Text style={[styles.singer, { color: colors.text }]}>
              {language.favorite}
            </Text>
            <Text style={styles.numSong}>{favoriteData?.length} {language.song}</Text>
            {/* button */}
            <View style={styles.buttons}>
              {/* <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
              >
                <Ionicons name="shuffle" size={20} color="white" />
                <Text style={[styles.buttonText, { color: "white" }]}>
                  Trộn bài
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.frame }]}
              >
                <Ionicons name="play-circle" size={20} color={colors.primary} />
                <Text style={[styles.buttonText, { color: colors.primary }]}>
                  {language.play}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* line */}
          <View style={styles.line}></View>

          {/* add songs */}
          <View style={[styles.addSong]}>
            <Text style={{ fontSize: 20, color: colors.text, fontWeight: 500 }}>{language.song}</Text>
          </View>
          {/*  */}
        </View>
      )}
      <FlatListSong songs={favoriteData} />
      {currentAudio && <MiniPlayer />}
    </SafeAreaView>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  header: {
    // flex: 1,
    marginTop: 10,
    // justifyContent: 'center',
    alignItems: "center",
  },
  poster: {
    width: 150,
    height: 150,
    borderRadius: 35,
  },
  singer: {
    fontSize: 28,
    fontWeight: "900",
    marginTop: 10,
    fontFamily: "sans-serif",
  },
  numSong: {
    fontSize: 15,
    // marginTop: 10,
    color: "gray",
    fontFamily: "sans-serif",
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    height: 45,
    width: 160,
    backgroundColor: "#ff973e",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
  line: {
    borderColor: "#efefef",
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 25,
  },
  addSong: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 20,
  },
});
