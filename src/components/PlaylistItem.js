import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { AntDesign, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext.js";
import { useNavigation } from "@react-navigation/native";
import { PlaylistContext } from "../context/PlaylistContext.js";
import { useIsFocused } from '@react-navigation/native';
import { doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../services/firebaseConfig.js";

const PlaylistItem = ({ type, name, id, numSong, action }) => {
  const isFocused = useIsFocused();
  const { colors } = useContext(ThemeContext);
  const { updatePlaylist, listSong, idPlaylist, addOneSongToPlaylist, setPlaylistArray, playlistArray } = useContext(PlaylistContext);
  const [numberSong, setNumberSong] = useState(numSong);
  const navigation = useNavigation();

  const handleLongPressDeletePlaylist = async () => {
    Alert.alert("Thông báo", "Bạn có chắc muốn xóa playlist " + name, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK', onPress: async () => {
          console.log('OK Pressed')
          const newPlaylist = playlistArray?.filter((item) => item.id !== id);
          setPlaylistArray([...newPlaylist]);
          await deleteDoc(doc(db, `users/${auth.currentUser.uid}/playlist/${id}`));
          alert("Đã xóa playlist thành công");
        }
      },
    ]);
  }
  useEffect(() => {
    if (id === idPlaylist) {
      setNumberSong(listSong.length)
      // console.log('update', id, name)
    }
  }, [isFocused])

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 70,
        paddingVertical: 5,
        paddingHorizontal: 20,
        backgroundColor: colors.background,
      }}
      onPress={async () => {
        if (action && action.action === "add") {
          await addOneSongToPlaylist(action.idSong, action.Playlist);
          navigation.goBack();
          return;
          // Alert.alert("Đã thêm vào playlist thành công");
        }
        else if (type == "Favorite") navigation.navigate("Favorite");
        else if (type == "Recent") navigation.navigate("Recent");
        else {
          await updatePlaylist(id);
          navigation.navigate("DetailPlaylist");
        }
      }}
      onLongPress={handleLongPressDeletePlaylist}
    >
      <View style={styles.content}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* Image */}
          <View style={styles.poster}>
            {type === "Favorite" && (
              <AntDesign name="heart" size={24} color="#ff8216" />
            )}
            {type === "Recent" && (
              <FontAwesome name="history" size={24} color="#ff8216" />
            )}
            {type !== "Favorite" && type !== "Recent" && (
              <MaterialIcons name="queue-music" size={24} color="#ff8216" />
            )}
          </View>

          {/* Info */}
          <View style={{ flex: 1 }}>
            <Text
              style={{ fontSize: 18, color: colors.text }}
              numberOfLines={1}
            >
              {name}
            </Text>
            {type !== "Favorite" && type !== "Recent" && <Text style={{ fontSize: 16, color: "gray" }}>{numberSong} Bài hát</Text>}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default PlaylistItem;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  poster: {
    width: 50,
    height: 50,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: "#f5f5f6",
    alignItems: "center",
    justifyContent: "center",
  },
});
