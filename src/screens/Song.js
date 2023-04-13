import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SongItem from "../components/SongItem.js"

const Song = () => {
  return (
    <View style={styles.container}>
      <SongItem />
    </View>
  );
};

export default Song;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: "center",
    // alignItems: "center",
  },
});
