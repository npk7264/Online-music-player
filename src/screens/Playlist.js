import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";

import SearchBar from "../components/SearchBar";
import PlaylistItem from "../components/PlaylistItem";

import { Feather } from "@expo/vector-icons";

const Playlist = () => {
  return (
    <SafeAreaView style={styles.container}>
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
      >
        <View style={styles.poster}>
          <Feather name="plus" size={24} color="white" />
        </View>
        {/* Info */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18 }} numberOfLines={1}>
            Tạo danh sách phát mới
          </Text>
        </View>
      </TouchableOpacity>

      <PlaylistItem type={"Favorite"} name={"Yêu thích"} />
      <PlaylistItem type={"Recent"} name={"Nghe gần đây"} />
      <PlaylistItem name={"New playlist"} />
    </SafeAreaView>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
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
