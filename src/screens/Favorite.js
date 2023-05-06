import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState, useContext, useEffect } from "react";

import BackBar from "../components/BackBar";
import SongItem from "../components/SongItem";

import { AudioContext } from "../context/AudioContext";
import { ThemeContext } from "../context/ThemeContext";

import { auth, db } from "../services/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

const Favorite = () => {
  const { userId, songData } = useContext(AudioContext);
  const [favoriteId, setFavoriteId] = useState([]);
  const { colors } = useContext(ThemeContext);

  const fetchFavorite = async (userId) => {
    try {
      const docRef = doc(db, "users/" + userId);
      const docSnap = await getDoc(docRef);
      setFavoriteId(docSnap.data().favorite);
      // console.log(docSnap.data().favorite);
    } catch (error) {
      console.log("Fail to fetch favorite songs", error);
    }
  };

  const favoriteData = songData
    .filter((item) => favoriteId.includes(item.id))
    .sort((a, b) => favoriteId.indexOf(a.id) - favoriteId.indexOf(b.id));

  useEffect(() => {
    fetchFavorite(userId);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar></StatusBar>

      <BackBar title={"Yêu thích"} />

      <FlatList
        data={favoriteData}
        renderItem={({ item }) => (
          <SongItem
            info={item}
            time={item.time}
            onPressOptionModal={() => {
              setOptionModalVisible(true);
              setCurrentItem(item);
            }}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default Favorite;

const styles = StyleSheet.create({});
