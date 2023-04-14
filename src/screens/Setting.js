import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import React from "react";

import SearchBar from "../components/SearchBar";

const Setting = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar></StatusBar>

      <SearchBar title={"Setting"} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Setting</Text>
      </View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
