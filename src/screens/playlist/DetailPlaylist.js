import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import BackBar from "../../components/BackBar";
import { ThemeContext } from "../../context/ThemeContext";
import { songs } from "../../../data";
import FlatListSong from "../../components/FlatListSong";
import MiniPlayer from "../../components/MiniPlayer";
import { useNavigation } from "@react-navigation/native";
import { PlaylistContext } from '../../context/PlaylistContext';
import { NotificationContext } from '../../context/NotifyContext';
import { AudioContext } from "../../context/AudioContext";
import { useIsFocused } from "@react-navigation/native";
import { selectSong } from '../../utils/AudioController';





const DetailPlaylist = () => {
  const contextPlaylist = useContext(PlaylistContext);
  const contextNotify = useContext(NotificationContext);
  const contextAudio = useContext(AudioContext)
  const { colors, language } = useContext(ThemeContext);
  const { listSong, filterSong, renderSong, playlistData } = contextPlaylist
  const { userId, currentAudio } = contextAudio
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    filterSong(listSong);
  }, [isFocused]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <BackBar isSearch={true}></BackBar>
      <View style={styles.header}>
        {/* info singer */}
        <Image
          source={{ uri: renderSong.length > 0 ? renderSong[0].image : "https://cdn.gdgtme.com/wp-content/uploads/2022/02/How-To-Create-A-Music-Playlist-For-Offline-Listening-In-2022.jpg" }}
          style={styles.poster}
        />
        <Text style={[styles.singer, { color: colors.text }]}>
          {playlistData?.name}
        </Text>
        <Text style={styles.numSong}>{listSong?.length} {language.song}</Text>
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
            onPress={() => selectSong(contextAudio, renderSong[0], renderSong, contextPlaylist, contextNotify)}
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
        <TouchableOpacity onPress={() => navigation.navigate("AddSong")}>
          <FontAwesome name="plus-square" size={30} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* list song */}
      <FlatListSong songs={renderSong} />
      {/* {renderSong.length > 0 && <FlatListSong songs={renderSong} />} */}
      {/* {renderSong.length == 0 && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 16 }}>Không có bài hát nào</Text>
        </View>
      )} */}
      {currentAudio && <MiniPlayer />}
    </SafeAreaView>
  );
};

export default DetailPlaylist;

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
