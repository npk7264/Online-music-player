import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import React from "react";

import SearchBar from "../components/SearchBar";

const Chart = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar></StatusBar>

      <SearchBar title={"Chart"} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Chart</Text>
      </View>
    </SafeAreaView>
  );
};

export default Chart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
