import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const AlbumItem = ({ name, songs, singer }) => {
    return (
        <TouchableOpacity style={styles.container}>
            {/* Image */}
            <Image
                source={require("../../assets/poster_music.png")}
                style={styles.poster}
            />
            {/* info */}
            <View style={styles.info}>
                <Text style={styles.name} >{name}</Text>
                <Text style={styles.singer}>{singer}</Text>
                <Text style={styles.numSong}>{songs?.length} bài hát</Text>
            </View>
        </TouchableOpacity>
    )
}

export default AlbumItem

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        // width: '40%',
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        // margin: 5,
        // width: '45%',
    },
    poster: {
        width: 150,
        height: 150,
        borderRadius: 15
    },
    info: {
        marginTop: 5,
        // backgroundColor: 'red',
        width: 150,
    },
    name: {
        fontSize: 16,
        fontWeight: '800',
    },
    singer: {
        fontSize: 12,
        color: 'gray',
    },
    numSong: {
        fontSize: 12,
        color: 'gray',
    },
})