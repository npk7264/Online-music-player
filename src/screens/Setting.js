import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import React from "react";

import SearchBar from "../components/SearchBar";
import { Avatar } from 'react-native-paper';

const Setting = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar></StatusBar>
      <SearchBar title={"Setting"} />

      <View style={styles.userInfoSection}>
        <Avatar.Icon size={100} icon="account" />
        <Text style={styles.userName}>Kien Võ</Text>
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
  userInfoSection: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  userName: {
    fontSize: 40,
    marginTop: 5
  },
});
