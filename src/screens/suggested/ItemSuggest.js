import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { AudioContext } from '../../context/AudioContext'
import { useNavigation } from "@react-navigation/native";
import { selectSong } from '../../utils/AudioController';

const ItemSuggest = ({ item, type, data, onPressOptionModal }) => {
    const navigation = useNavigation();
    const { colors } = useContext(ThemeContext);
    const contextAudio = useContext(AudioContext);
    const handlePressItem = async () => {
        if (type === "song") {
            await selectSong(contextAudio, item, data)
            navigation.navigate("Player");
        }
    }
    return (
        <TouchableOpacity style={styles.container} onPress={handlePressItem} onLongPress={onPressOptionModal}>
            <Image source={{ uri: item.image }} style={styles.poster} />
            <Text style={[styles.text, { color: colors.text }]}>{item.name}</Text>
        </TouchableOpacity>
    )
}

export default ItemSuggest

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 140,
        alignItems: "center",
        // justifyContent: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
        // backgroundColor: 'red'
    },
    poster: {
        height: 140,
        width: 140,
        borderRadius: 20
    },
    text: {
        width: 135,
        marginTop: 5,
        textAlign: 'center'
    },
})