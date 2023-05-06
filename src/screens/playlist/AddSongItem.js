import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useContext } from 'react'
import { FontAwesome } from "@expo/vector-icons";
import { ThemeContext } from '../../context/ThemeContext';
const AddSongItem = (props) => {
    const { colors } = useContext(ThemeContext);
    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: colors.backgorund }]}
            onPress={() => console.log('add song to playlist')}
        >
            <View style={styles.content}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    {/* Image */}
                    <Image
                        source={require("../../../assets/temp.jpg")}
                        style={styles.poster}
                    />

                    {/* Info */}
                    <View style={{ flex: 1, paddingRight: 10 }}>
                        <Text style={{ fontSize: 18, color: colors.text }} numberOfLines={1}>
                            {props.info.name}
                        </Text>
                        <Text style={{ fontSize: 16, color: "gray" }} numberOfLines={1}>
                            {props.info.singer}
                        </Text>
                    </View>
                </View>

                {/* Button */}
                <View style={styles.buttonContainter}>
                    {/* PLAY/PAUSE */}
                    <FontAwesome
                        name={"check-square-o"}
                        size={30}
                        color={colors.primary}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default AddSongItem

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 70,
        paddingVertical: 5,
        paddingHorizontal: 20,

    },
    content: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    poster: {
        width: 50,
        height: 50,
        marginRight: 20,
        borderRadius: 15,
    },
    buttonContainter: {
        width: "10%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-start',
    },
})