import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import BackBar from '../components/BackBar';
const ArtistDetail = ({ route }) => {
    const name = route.params.name;
    const songs = route.params.songs;
    return (
        <SafeAreaView style={styles.container}>
            <BackBar></BackBar>

            <View style={styles.content}>
                <View></View>
            </View>
        </SafeAreaView>
    )
}

export default ArtistDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    content: {

    },
    header: {

    },
    bottom: {

    },
})