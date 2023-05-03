import { StyleSheet } from "react-native";
import React from "react";

import { MaterialCommunityIcons, Entypo, Ionicons } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import TopMenu from "./TopMenu";
import Playlist from "../screens/Playlist";
import Chart from "../screens/Chart";
import Setting from "../screens/setting/Setting";

const BottomMenu = () => {
  return (
    <Tab.Navigator
      initialRouteName="Cài đặt"
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
              size={20}
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
              size={20}
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
              size={20}
              color={focused ? "#ff8216" : "#ccc"}
            />
          ),
          tabBarInactiveTintColor: "#ccc",
          tabBarActiveTintColor: "#ff8216",
        }}
      />
      <Tab.Screen
        name="Cài đặt"
        component={Setting}
        options={{
          tabBarLabelStyle: styles.menuTitle,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="settings-sharp"
              size={20}
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
  menuTitle: { fontSize: 13, fontWeight: "500" },
});
