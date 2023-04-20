import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ArtistItem from "../components/ArtistItem";

const Artist = () => {
  return (
    <View style={styles.container}>
      <ArtistItem />
    </View>
  );
};

export default Artist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: "center",
    // alignItems: "center",
  },
});
