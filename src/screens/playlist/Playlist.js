import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState, useContext } from "react";

import SearchBar from "../../components/SearchBar";
import PlaylistItem from "../../components/PlaylistItem";
import AddPlaylist from "./AddPlaylist";

import { Feather } from "@expo/vector-icons";
import { AudioContext } from "../../context/AudioContext";
import { ThemeContext } from "../../context/ThemeContext.js";
import MiniPlayer from "../../components/MiniPlayer";

const Playlist = () => {
  const { colors } = useContext(ThemeContext);
  const [addPlaylist, setAddPlaylist] = useState(false);
  const { soundObj } = useContext(AudioContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar></StatusBar>

      <SearchBar title={"Playlist"} />

      {/* ADD NEW PLAYLIST */}
      <TouchableOpacity
        style={{
          width: "100%",
          height: 70,
          paddingVertical: 5,
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => setAddPlaylist(true)}
      >
        <View style={styles.poster}>
          <Feather name="plus" size={24} color="white" />
        </View>
        {/* Info */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, color: colors.text }} numberOfLines={1}>
            Tạo danh sách phát mới
          </Text>
        </View>
      </TouchableOpacity>

      <PlaylistItem type={"Favorite"} name={"Yêu thích"} />
      <PlaylistItem type={"Recent"} name={"Nghe gần đây"} />
      <PlaylistItem name={"New playlist"} />

      <AddPlaylist
        visible={addPlaylist}
        onClose={() => setAddPlaylist(false)}
      />
      {soundObj && <MiniPlayer />}
    </SafeAreaView>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  poster: {
    width: 50,
    height: 50,
    marginRight: 20,
    borderRadius: 50,
    backgroundColor: "#ff8216",
    alignItems: "center",
    justifyContent: "center",
  },
});
