import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import TopMenu from "./TopMenu";
import Song from "../screens/Song";
import Playlist from "../screens/Playlist";
import Chart from "../screens/Chart";

const BottomMenu = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Home"
        component={TopMenu}
        options={{
          tabBarLabelStyle: styles.menuTitle,
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="home"
              size={24}
              color={focused ? "#ff8216" : "#ccc"}
            />
          ),
          tabBarInactiveTintColor: "#ccc",
          tabBarActiveTintColor: "#ff8216",
        }}
      />
      <Tab.Screen
        name="Playlist"
        component={Playlist}
        options={{
          tabBarLabelStyle: styles.menuTitle,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="playlist-music"
              size={24}
              color={focused ? "#ff8216" : "#ccc"}
            />
          ),
          tabBarInactiveTintColor: "#ccc",
          tabBarActiveTintColor: "#ff8216",
        }}
      />
      <Tab.Screen
        name="Xếp hạng"
        component={Chart}
        options={{
          tabBarLabelStyle: styles.menuTitle,
          tabBarIcon: ({ focused }) => (
            <Entypo
              name="bar-graph"
              size={24}
              color={focused ? "#ff8216" : "#ccc"}
            />
          ),
          tabBarInactiveTintColor: "#ccc",
          tabBarActiveTintColor: "#ff8216",
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomMenu;

const styles = StyleSheet.create({
  menuTitle: { fontSize: 14, fontWeight: "500" },
});
