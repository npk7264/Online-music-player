import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Artist = () => {
  return (
    <View style={styles.container}>
      <Text>Artist</Text>
    </View>
  );
};

export default Artist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
  },
});
