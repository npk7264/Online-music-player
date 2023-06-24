import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import BackBar from "../components/BackBar";
import MiniPlayer from "../components/MiniPlayer";

import { PlaylistContext } from "../context/PlaylistContext";
import { AudioContext } from "../context/AudioContext";
import { ThemeContext } from "../context/ThemeContext";
import FlatListSong from "../components/FlatListSong";
import { getRecent } from "../utils/FirebaseHandler";

import { Ionicons, FontAwesome } from "@expo/vector-icons";

const Recent = () => {
  const { userId, currentAudio } = useContext(AudioContext);
  const { recentData, setRecentData } = useContext(PlaylistContext);
  const { colors, language } = useContext(ThemeContext);
  const [loaded, setLoaded] = useState(recentData?.length !== 0);

  const isFocused = useIsFocused();
  useEffect(() => {
    const fetchData = async () => {
      const recent = await getRecent(userId);
      setRecentData(recent);
      setLoaded(true);
    };
    if (recentData?.length === 0)
      fetchData();
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar></StatusBar>

      <BackBar title={language.recentlyPlayed} />

      {!loaded && <ActivityIndicator size="large" color={colors.primary} />}

      {loaded && (
        <View>
          <View style={styles.header}>
            {/* info singer */}
            <Image
              source={{ uri: 'https://kcr.sdsu.edu/wordpress/wp-content/uploads/IMG_0481.jpg' }}
              style={styles.poster}
            />
            <Text style={[styles.singer, { color: colors.text }]}>
              {language.recentlyPlayed}
            </Text>
            <Text style={styles.numSong}>{recentData?.length} {language.song}</Text>
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
            <Text style={{ fontSize: 20, color: colors.text, fontWeight: 500 }}>
              {language.song}
            </Text>
          </View>
          {/*  */}
        </View>
      )}

      <FlatListSong songs={recentData} />
      {currentAudio && <MiniPlayer />}
    </SafeAreaView>
  );
};

export default Recent;

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
