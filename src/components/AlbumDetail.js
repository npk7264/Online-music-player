import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import BackBar from '../components/BackBar';

import { Ionicons } from "@expo/vector-icons";

import FlatListSong from './FlatListSong';
import { ThemeContext } from '../context/ThemeContext';
import { AudioContext } from '../context/AudioContext';

const AlbumDetail = ({ route }) => {
    const { colors } = useContext(ThemeContext);
    const { songData } = useContext(AudioContext);
    const [listSong, setListSong] = useState([]);
    const name = route.params.name;
    const singer = route.params.singer;
    const image = route.params.image;
    const id = route.params.id;
    const idSinger = route.params.idSinger;

    useEffect(() => {
        const songs = songData?.filter(item => item.idAlbum === id);
        setListSong(songs)
    }, [])

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <BackBar isSearch={true}></BackBar>
            <View style={styles.header}>
                {/* info singer */}
                <Image
                    source={{ uri: image }}
                    style={styles.poster} />
                <Text style={[styles.nameAlbum, { color: colors.text }]}>{name}</Text>
                <Text style={styles.singer}> {singer}</Text>
                <Text style={styles.numSong}>{listSong?.length} bài hát</Text>
                {/* button */}
                <View style={styles.buttons}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]}>
                        <Ionicons name='shuffle' size={20} color='white' />
                        <Text style={[styles.buttonText, { color: 'white' }]}>Shuffle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: colors.frame }]}>
                        <Ionicons name='play-circle' size={20} color={colors.primary} />
                        <Text style={[styles.buttonText, { color: colors.primary }]}>Play</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* line */}
            <View style={styles.line}></View>

            {/* list song */}
            <FlatListSong
                songs={listSong}
            />
        </SafeAreaView>
    )
}

export default AlbumDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        // flex: 1,
        marginTop: 10,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    poster: {
        width: 200,
        height: 200,
        borderRadius: 35,
    },
    nameAlbum: {
        fontSize: 28,
        fontWeight: '900',
        marginTop: 10,
        fontFamily: 'sans-serif',
    },
    singer: {
        fontSize: 20,
        marginTop: 10,
        fontFamily: 'sans-serif',
    },
    numSong: {
        fontSize: 15,
        marginTop: 10,
        color: 'gray',
        fontFamily: 'sans-serif',
    },
    buttons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 10,
    },
    button: {
        height: 45,
        width: 160,
        backgroundColor: '#ff973e',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        fontSize: 16,
        marginLeft: 10,
        fontWeight: 'bold',
    },
    line: {
        borderColor: '#efefef',
        borderBottomWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: 25,
    },
})