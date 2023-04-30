import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import BackBar from '../components/BackBar';

import { Ionicons } from "@expo/vector-icons";
import SongItem from '../components/SongItem';
import { songs } from '../../data';
import FlatListSong from './FlatListSong';

const AlbumDetail = ({ route }) => {
    const name = route.params.name;
    const singer = route.params.singer;
    const idSong = route.params.songs;
    const listSongs = songs.filter(obj => idSong.includes(obj.id));
    return (
        <SafeAreaView style={styles.container}>
            <BackBar isSearch={true}></BackBar>
            <View style={styles.header}>
                {/* info singer */}
                <Image
                    source={require("../../assets/temp.jpg")}
                    style={styles.poster} />
                <Text style={styles.singer}>{name}</Text>
                <Text style={styles.numSong}>{songs.length} bài hát</Text>
                {/* button */}
                <View style={styles.buttons}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#ff8216' }]}>
                        <Ionicons name='shuffle' size={20} color='white' />
                        <Text style={[styles.buttonText, { color: 'white' }]}>Shuffle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#fff3e8' }]}>
                        <Ionicons name='play-circle' size={20} color='#ff8216' />
                        <Text style={[styles.buttonText, { color: '#ff8216' }]}>Play</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* line */}
            <View style={styles.line}></View>

            {/* list song */}
            <FlatListSong
                songs={listSongs}
            />
        </SafeAreaView>
    )
}

export default AlbumDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
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
    singer: {
        fontSize: 28,
        fontWeight: '900',
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
        width: '90%',
        borderColor: '#efefef',
        borderBottomWidth: 1,
        paddingBottom: 25,
    },
})