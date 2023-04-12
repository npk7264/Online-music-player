import { StyleSheet, Text, View, StatusBar, SafeAreaView } from "react-native";
import React from "react";
import SearchBar from "../components/SearchBar";
import Title from "../components/Title";
const Chart = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar></StatusBar>

      <View style={styles.header}>
        <Title title={"MyMusic"}></Title>
        <SearchBar></SearchBar>
      </View>
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
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
});
