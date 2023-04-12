import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Song from "../screens/Song";
import Artist from "../screens/Artist";
import SearchBar from "./SearchBar";
import Title from "./Title";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

const TopMenu = () => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar></StatusBar>

      <View style={styles.header}>
        <Title title={"MyMusic"}></Title>
        <SearchBar></SearchBar>
      </View>

      <Tab.Navigator
        initialRouteName="Bài hát"
        screenOptions={{
          tabBarActiveTintColor: "#ff8216",
          tabBarInactiveTintColor: "#ccc",
          tabBarLabelStyle: styles.label,
          tabBarIndicatorStyle: styles.indicator,
          tabBarPressColor: "white",
        }}
        style={{ marginTop: insets.top }}
      >
        <Tab.Screen name="Bài hát" component={Song} />
        <Tab.Screen name="Ca sĩ" component={Artist} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TopMenu;

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
  label: {
    fontSize: 14,
    fontWeight: "500",
    textTransform: "none",
  },
  indicator: { backgroundColor: "#ff8216", height: 3, borderRadius: 25 },
});
