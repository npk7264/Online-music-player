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
import { useIsFocused } from "@react-navigation/native";

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

const Recent = () => {
  const { userId, songData } = useContext(AudioContext);
  const [recentId, setRecentId] = useState([]);
  const { colors } = useContext(ThemeContext);

  const fetchRecent = async (userId) => {
    try {
      const docRef = doc(db, "users/" + userId);
      const docSnap = await getDoc(docRef);
      setRecentId(docSnap.data().recently);
      // console.log(docSnap.data().recently);
    } catch (error) {
      console.log("Fail to fetch favorite songs", error);
    }
  };

  const recentData = songData
    .filter((item) => recentId.includes(item.id))
    .sort((a, b) => recentId.indexOf(a.id) - recentId.indexOf(b.id));

  const isFocused = useIsFocused();
  useEffect(() => {
    fetchRecent(userId);
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar></StatusBar>

      <BackBar title={"Gần đây"} />

      <FlatList
        data={recentData}
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

export default Recent;

const styles = StyleSheet.create({});
