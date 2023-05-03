import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { useContext } from "react";
import { color } from "../constants/color";

import Song from "../screens/Song";
import Artist from "../screens/Artist";
import SearchBar from "./SearchBar";
import MiniPlayer from "./MiniPlayer";
import Suggested from "./Suggested";
import Albums from "./Albums";

import { ThemeContext } from "../context/ThemeContext";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

import { AudioContext } from "../context/AudioContext";

const TopMenu = () => {
  const { soundObj } = useContext(AudioContext);
  const { colors } = useContext(ThemeContext);
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.backgroundColor }]}>
      <StatusBar></StatusBar>

      <SearchBar title={"mymusic"} />

      <Tab.Navigator
        initialRouteName="Bài hát"
        screenOptions={{
          tabBarActiveTintColor: color.primary,
          tabBarInactiveTintColor: "#ccc",
          tabBarLabelStyle: styles.label,
          tabBarIndicatorStyle: styles.indicator,
          tabBarPressColor: "black",
          tabBarStyle: { backgroundColor: colors.background },
        }}

      >
        {/* <Tab.Screen name="Khám phá" component={Suggested} /> */}
        <Tab.Screen name="Bài hát" component={Song} />
        <Tab.Screen name="Ca sĩ" component={Artist} />
        <Tab.Screen name="Albums" component={Albums} />
      </Tab.Navigator>

      {soundObj && <MiniPlayer />}
    </SafeAreaView>
  );
};

export default TopMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    textTransform: "none",
  },
  indicator: { backgroundColor: color.primary, height: 3, borderRadius: 25 },
});
