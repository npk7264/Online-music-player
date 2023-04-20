import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import BackBar from '../components/BackBar';
const ArtistDetail = ({ route }) => {
    const name = route.params.name;
    const songs = route.params.songs;
    return (
        <SafeAreaView style={styles.container}>
            <BackBar></BackBar>
            <View style={styles.header}>
                <Image
                    source={require("../../assets/temp.jpg")}
                    style={styles.poster} />
                <Text style={styles.singer}>{name}</Text>
                <Text style={styles.numSong}>{songs.length} bài hát</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#ff8216' }]}>
                        <Text style={[styles.buttonText, { color: 'white' }]}>Shuffle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#fff3e8' }]}>
                        <Text style={[styles.buttonText, { color: '#ff8216' }]}>Play</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={styles.bottom}></View>
        </SafeAreaView>
    )
}

export default ArtistDetail;

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
        width: 250,
        height: 250,
        borderRadius: 35,
    },
    singer: {
        fontSize: 30,
        fontWeight: '900',
        marginTop: 15,
        fontFamily: 'sans-serif',
    },
    numSong: {
        fontSize: 20,
        marginTop: 15,
        color: 'gray',
        fontFamily: 'sans-serif',
    },
    buttons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        height: 60,
        width: 180,
        backgroundColor: '#ff973e',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    bottom: {
        flex: 1,

    },
})