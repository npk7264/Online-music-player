import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native'
import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext"
import BackBar from '../../components/BackBar.js';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { color } from '../../constants/color';
import Favorites from './menuAddSong/Favorites';
import Songs from './menuAddSong/Songs';
import Recent from './menuAddSong/Recent';
import SongInPlayList from './menuAddSong/SongInPlayList';
import { PlaylistContext } from '../../context/PlaylistContext';
const Tab = createMaterialTopTabNavigator();

const AddSong = () => {
    const { colors, darkMode } = useContext(ThemeContext);
    const { searchText, setSearchText } = useContext(PlaylistContext);
    const [isFocused, setIsFocused] = useState(false); // focus TextInput
    // const [searchText, setSearchText] = useState("");
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <BackBar></BackBar>

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
                placeholder="Search"
                placeholderTextColor={colors.text}
                // autoFocus={true}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChangeText={(text) => {
                    setSearchText(text);
                }}
            />

            <Tab.Navigator
                initialRouteName="Bài hát"
                screenOptions={{
                    tabBarActiveTintColor: colors.primary,
                    tabBarInactiveTintColor: "#ccc",
                    tabBarLabelStyle: styles.label,
                    tabBarIndicatorStyle: styles.indicator,
                    tabBarPressColor: darkMode ? 'black' : 'white',
                    tabBarStyle: { backgroundColor: colors.background },
                }}
            >
                <Tab.Screen name="Bài hát" component={Songs} />
                <Tab.Screen name="Playlist" component={SongInPlayList} />
                <Tab.Screen name="Gần đây" component={Recent} />
                <Tab.Screen name="Yêu thích" component={Favorites} />

            </Tab.Navigator>
        </SafeAreaView >
    )
}

export default AddSong

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
    searchInput: {
        // flex: 1,
        height: 35,
        borderRadius: 15,
        paddingHorizontal: 15,
        marginHorizontal: 30,
        fontSize: 15,
    },
})