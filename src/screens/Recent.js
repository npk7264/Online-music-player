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
import { getRecent } from "../utils/FirebaseHandler";

const Recent = () => {
  const { userId, currentAudio } = useContext(AudioContext);
  const [recentData, setRecentData] = useState([]);
  const { colors } = useContext(ThemeContext);



  const isFocused = useIsFocused();
  useEffect(() => {
    const fetchData = async () => {
      const recent = await getRecent(userId);
      setRecentData(recent);
    }
    fetchData();
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
