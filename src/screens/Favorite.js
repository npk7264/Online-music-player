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

import FlatListSong from "../components/FlatListSong";
import { fetchFavorite } from "../utils/FirebaseHandler";
import { useIsFocused } from "@react-navigation/native";

const Favorite = () => {
  const { userId, currentAudio } = useContext(AudioContext);
  const [favoriteData, setFavoriteData] = useState([]);
  const { colors } = useContext(ThemeContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      const favorite = await fetchFavorite(userId);
      setFavoriteData(favorite);
    }
    fetchData();
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
