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
import MiniPlayer from "../components/MiniPlayer";

import { AudioContext } from "../context/AudioContext";
import { ThemeContext } from "../context/ThemeContext";
import FlatListSong from "../components/FlatListSong";
import { auth, db } from "../services/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  query,
  where,
  documentId
} from "firebase/firestore";

const Recent = () => {
  const { userId, songData, soundObj, currentAudio } = useContext(AudioContext);
  const [recentData, setRecentData] = useState([]);
  const { colors } = useContext(ThemeContext);

  const getRecent = async (userId) => {
    try {
      const docSnap = await getDoc(doc(db, "users/" + userId));
      const userData = docSnap.data();
      const history = userData.recently;

      const songsRef = collection(db, "songs");
      const q = query(songsRef, where(documentId(), "in", history));

      const querySnapshot = await getDocs(q);

      const songsArray = await Promise.all(
        querySnapshot.docs.map((docRef) => {
          const songData = {
            id: docRef.id,
            name: docRef.data().name,
            image: docRef.data().image,
            public: docRef.data().public,
            singer: docRef.data().artists,
            album: docRef.data().album,
            uri: docRef.data().url,
            lyric: docRef.data().lyric,
            view: docRef.data().view
          }
          return songData;
        })
      );
      const sortedSongs = songsArray.sort((a, b) => {
        const indexA = history.indexOf(a.id);
        const indexB = history.indexOf(b.id);
        return indexA - indexB;
      })
      setRecentData(sortedSongs);
      // console.log(songsArray);
    } catch (error) {
      console.log("Fail to fetch history songs", error);
    }
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    getRecent(userId);
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar></StatusBar>

      <BackBar title={"Gần đây"} />

      <FlatListSong songs={recentData} />

      {currentAudio && <MiniPlayer />}
    </SafeAreaView>
  );
};

export default Recent;

const styles = StyleSheet.create({});
