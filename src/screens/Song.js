import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";

import SongItem from "../components/SongItem.js";
import OptionModal from "../components/OptionModal.js";

import { FontAwesome } from "@expo/vector-icons";

// test data
import { songs } from "../../data.js";

import { auth, db } from "../services/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const Song = () => {
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [songs, setSongs] = useState([]);

  const fetchSongs = async () => {
    const querySnapshot = await getDocs(collection(db, "songs"));
    const songsArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSongs(songsArray);
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          height: 50,
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "500" }}>10 bài hát</Text>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#ff8216",
              marginRight: 10,
            }}
          >
            Sắp xếp
          </Text>
          <View>
            <FontAwesome name="sort" size={30} color="#ff8216" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Song list */}
      <FlatList
        data={songs}
        renderItem={({ item }) => (
          <SongItem
            info={item}
            onPressOptionModal={() => {
              setOptionModalVisible(true);
              setCurrentItem(item);
            }}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      {/* <MiniPlayer /> */}
      <OptionModal
        options={[
          {
            title: "Play Next",
            icon: "keyboard-tab",
            onPress: (item) => {
              console.log(`play next ${item.song}`);
            },
          },
          {
            title: "Add to playlist",
            icon: "add-circle-outline",
            onPress: (item) => {
              console.log(`add playlist ${item.song}`);
            },
          },
        ]}
        currentItem={currentItem}
        onClose={() => setOptionModalVisible(false)}
        visible={optionModalVisible}
      />
    </View>
  );
};

export default Song;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
