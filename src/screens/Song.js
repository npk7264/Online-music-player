import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";

import SongItem from "../components/SongItem.js";
import OptionModal from "../components/OptionModal.js";

import { FontAwesome } from "@expo/vector-icons";

import FlatListSong from "../components/FlatListSong.js";

import { AudioContext } from "../context/AudioContext.js";
import { ThemeContext } from "../context/ThemeContext.js";
import { fetchRecentestSong } from "../utils/FirebaseHandler.js";

const Song = () => {
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const { colors } = useContext(ThemeContext);
  const context = useContext(AudioContext);
  const { songData, soundObj, userId, updateState } = context;

  useEffect(() => {
    fetchRecentestSong(context);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={{
          height: 50,
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "500", color: colors.text }}>
            {songData.length} bài hát
          </Text>
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
              color: colors.primary,
              marginRight: 10,
            }}
          >
            Sắp xếp
          </Text>
          <View>
            <FontAwesome name="sort" size={30} color={colors.primary} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Song list */}
      <FlatListSong songs={songData} />
    </View>
  );
};

export default Song;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
