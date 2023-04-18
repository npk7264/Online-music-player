import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";

import SongItem from "../components/SongItem.js";
import OptionModal from "../components/OptionModal.js";
import MiniPlayer from "../components/MiniPlayer.js";

import { FontAwesome } from "@expo/vector-icons";

// test data
//import { songs } from "../../data.js";

import { collection, getDocs } from "firebase/firestore";
import db from "../components/FirebaseConfig.js";

const Song = () => {
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [songs, setSongs] = useState([]);

  //read data fireStore
  useEffect(() => {
    async function fetchData() {
      let song = [];
      const querySnapshot = await getDocs(collection(db, "songs"));
      querySnapshot.forEach((doc) => {
        const { name, singer } = doc.data()
        // console.log(`${doc.id} => {${name},${singer}}`);
        // setSongs([...songs, { id: doc.id, name: name, singer: singer, time: '3:00' }])
        song.push({ id: doc.id, name: name, singer: singer, time: '3:00' });
      });
      setSongs(song)
    }
    fetchData();
  }, [])


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
            song={item.name}
            singer={item.singer}
            time={item.time}
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
            title: "Add to playlist",
            onPress: () => {
              console.log("add playlist");
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
