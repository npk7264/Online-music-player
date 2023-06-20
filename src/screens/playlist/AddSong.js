import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import BackBar from "../../components/BackBar.js";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { color } from "../../constants/color";
import Favorites from "./menuAddSong/Favorites";
import Songs from "./menuAddSong/Songs";
import Recent from "./menuAddSong/Recent";
import SongInPlayList from "./menuAddSong/SongInPlayList";
import { FontAwesome } from "@expo/vector-icons";
import { PlaylistContext } from "../../context/PlaylistContext";
import { useNavigation } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

const AddSong = () => {
  const { colors, darkMode } = useContext(ThemeContext);
  const { searchText, setSearchText } = useContext(PlaylistContext);
  const [isFocused, setIsFocused] = useState(false);
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.searchBar}>
        {/* Back Button */}
        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          onPress={() => {
            setSearchText("");
            navigation.goBack();
          }}
        >
          <FontAwesome name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        {/* Search Input */}
        <TextInput
          style={[
            styles.searchInput,
            {
              borderColor: isFocused ? "#ff8216" : null,
              backgroundColor: isFocused
                ? darkMode
                  ? "#2a221f"
                  : "#fff5ed"
                : darkMode
                  ? "#1f222a"
                  : "#f5f5f6",
              borderWidth: isFocused ? 1 : 0,
              color: colors.text,
            },
          ]}
          placeholder="Tìm kiếm bài hát"
          placeholderTextColor={colors.text}
          // autoFocus={true}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(text) => {
            setSearchText(text);
          }}
        />
      </View>

      <Tab.Navigator
        initialRouteName="Bài hát"
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: "#ccc",
          tabBarLabelStyle: styles.label,
          tabBarIndicatorStyle: styles.indicator,
          tabBarPressColor: darkMode ? "black" : "white",
          tabBarStyle: { backgroundColor: colors.background },
        }}
      >
        <Tab.Screen name="Bài hát" component={Songs} />
        <Tab.Screen name="Playlist" component={SongInPlayList} />
        <Tab.Screen name="Gần đây" component={Recent} />
        <Tab.Screen name="Yêu thích" component={Favorites} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default AddSong;

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
  searchBar: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 20,
    paddingVertical: 10,
    height: 60,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 15,
  },
  searchType: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    // backgroundColor: 'red',
    marginBottom: 10,
  },
  searchTypeItem: {
    borderColor: color.primary,
    borderWidth: 2,
    borderRadius: 15,
    height: 36,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  textType: {
    fontSize: 15,
    fontWeight: 500,
  },
  nothingSearch: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
