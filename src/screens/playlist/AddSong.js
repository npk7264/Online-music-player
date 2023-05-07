import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext"
import BackBar from '../../components/BackBar.js';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { color } from '../../constants/color';
import Favorites from './menuAddSong/Favorites';
import Songs from './menuAddSong/Songs';
import Recent from './menuAddSong/Recent';

const Tab = createMaterialTopTabNavigator();

const AddSong = () => {
    const { colors, darkMode } = useContext(ThemeContext);
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <BackBar></BackBar>
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
                <Tab.Screen name="Gần đây" component={Recent} />
                <Tab.Screen name="Yêu thích" component={Favorites} />

            </Tab.Navigator>
        </SafeAreaView>
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
})