import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState, useContext, useEffect } from "react";

import SearchBar from "../../components/SearchBar";
import PlaylistItem from "../../components/PlaylistItem";
import AddPlaylist from "./AddPlaylist";

import { Feather } from "@expo/vector-icons";
import { AudioContext } from "../../context/AudioContext";
import { ThemeContext } from "../../context/ThemeContext.js";
import MiniPlayer from "../../components/MiniPlayer";

import { auth, db } from "../../services/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const Playlist = () => {
  const { colors } = useContext(ThemeContext);
  const [addPlaylist, setAddPlaylist] = useState(false);

  const { userId, currentAudio } = useContext(AudioContext);

  const [playlistData, setPlaylistData] = useState([]);

  const fetchPlaylist = async () => {

    const querySnapshot = await getDocs(
      collection(db, `users/${userId}/playlist`)
    );

    const playlistArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      numSong: doc.data().numSong,
    }));

    setPlaylistData([...playlistArray]);
  }
  const checkPlaylist = () => {
    fetchPlaylist();
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPlaylist();
    };
    fetchData();
  }, []);

  // console.log("PLAYLIST render");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar></StatusBar>

      <SearchBar title={"Playlist"} />
      <FlatList
        data={[{ id: 'add', name: 'Tạo danh sách phát mới' }, { id: 'Favorite', name: 'Yêu thích' }, { id: 'Recent', name: 'Nghe gần đây' }, ...playlistData]}
        renderItem={({ item }) => {
          if (item.id === 'add') {
            return (
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
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ fontSize: 18, color: colors.text }}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          } else if (item.id === 'Favorite' || item.id === "Recent") { return (<PlaylistItem type={item.id} name={item.name} />) }
          else {
            return (
              <PlaylistItem
                id={item.id}
                name={item.name}
                numSong={item.numSong}
              />
            );
          }
        }}
        nestedScrollEnabled={false}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <View style={{ flex: 1 }}>
            {/* modal add new playlist */}
            <AddPlaylist
              visible={addPlaylist}
              onClose={() => setAddPlaylist(false)}
              checkPlaylist={checkPlaylist}
            />
          </View>
        )}
      />

      {currentAudio && <MiniPlayer />}
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
