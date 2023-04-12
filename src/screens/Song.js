import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Song = () => {
  return (
    <View style={styles.container}>
      <Text>Song</Text>
    </View>
  );
};

export default Song;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
  },
});
