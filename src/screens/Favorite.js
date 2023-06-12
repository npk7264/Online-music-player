import {
  StyleSheet,
  StatusBar,
  SafeAreaView,

} from "react-native";
import { useState, useContext, useEffect } from "react";

import BackBar from "../components/BackBar";
import MiniPlayer from "../components/MiniPlayer";

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
  query,
  where,
  documentId
} from "firebase/firestore";

import FlatListSong from "../components/FlatListSong";

import { useIsFocused } from "@react-navigation/native";

const Favorite = () => {
  const { userId, songData, soundObj, currentAudio } = useContext(AudioContext);
  const [favoriteData, setFavoriteData] = useState([]);
  const { colors } = useContext(ThemeContext);

  const fetchFavorite = async (userId) => {
    try {
      const docSnap = await getDoc(doc(db, "users/" + userId));
      const userData = docSnap.data();
      const favorite = userData.favorite;

      const songsRef = collection(db, "songs");
      const q = query(songsRef, where(documentId(), "in", favorite));

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
        const indexA = favorite.indexOf(a.id);
        const indexB = favorite.indexOf(b.id);
        return indexA - indexB;
      })
      setFavoriteData(sortedSongs);
      // console.log(songsArray);
    } catch (error) {
      console.log("Fail to fetch favorite songs", error);
    }
  };


  const isFocused = useIsFocused();
  useEffect(() => {
    fetchFavorite(userId);
  }, [isFocused]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar></StatusBar>

      <BackBar title={"Yêu thích"} />

      <FlatListSong songs={favoriteData} />

      {currentAudio && <MiniPlayer />}
    </SafeAreaView>
  );
};

export default Favorite;

const styles = StyleSheet.create({});
