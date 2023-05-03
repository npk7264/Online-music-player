import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useContext } from "react";
import ArtistItem from "../components/ArtistItem";
import { artist } from "../../data";
import OptionModal from "../components/OptionModal";
import { ThemeContext } from "../context/ThemeContext";

const Artist = () => {
  const { colors } = useContext(ThemeContext);
  const [currentSinger, setCurrentSinger] = useState(null);
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* artist list */}
      <FlatList
        data={artist}
        renderItem={({ item }) => (
          <ArtistItem
            name={item.name}
            songs={item.songs}
            onPressOptionModal={() => {
              setOptionModalVisible(true);
              setCurrentSinger(item);
            }}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <OptionModal
        options={[
          {
            title: "Play Next",
            icon: "keyboard-tab",
            onPress: (item) => {
              console.log(`play next ${item.name}`);
            },
          },
          {
            title: "Add to playlist",
            icon: "add-circle-outline",
            onPress: (item) => {
              console.log(`add playlist ${item.name}`);
            },
          },
        ]}
        currentItem={currentSinger}
        onClose={() => setOptionModalVisible(false)}
        visible={optionModalVisible}
      />
    </View>
  );
};

export default Artist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
