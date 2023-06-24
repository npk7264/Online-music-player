import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { useContext } from "react";
import { color } from "../constants/color";
import Song from "../screens/Song";
import Artist from "../screens/Artist";
import SearchBar from "./SearchBar";
import MiniPlayer from "./MiniPlayer";
import Suggested from "../screens/suggested/Suggested";
import Albums from "./Albums";
import Genre from "../screens/genre/Genre";

import { ThemeContext } from "../context/ThemeContext";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

import { AudioContext } from "../context/AudioContext";

const TopMenu = () => {
  const { soundObj, currentAudio } = useContext(AudioContext);
  const { colors, darkMode, language } = useContext(ThemeContext);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.backgroundColor }]}
    >
      <StatusBar></StatusBar>

      <SearchBar title={"mymusic"} />

      <Tab.Navigator
        initialRouteName={language.suggested}
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: "#ccc",
          tabBarLabelStyle: styles.label,
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
            height: 3,
            borderRadius: 25,
          },
          tabBarPressColor: darkMode ? "black" : "white",
          tabBarStyle: { backgroundColor: colors.background },
        }}
      >
        <Tab.Screen name={language.suggested} component={Suggested} />
        <Tab.Screen name={language.song} component={Song} />
        <Tab.Screen name={language.artist} component={Artist} />
        <Tab.Screen name={language.album} component={Albums} />
        <Tab.Screen name={language.genre} component={Genre} />
      </Tab.Navigator>

      {currentAudio && <MiniPlayer />}
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
});
