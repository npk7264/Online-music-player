import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddSongItem from '../AddSongItem'


// test data
import { songs } from '../../../../data'
const data = { ...songs[1] };

const Songs = () => {
    return (
        <View>
            <AddSongItem info={data}></AddSongItem>
        </View>
    )
}

export default Songs

const styles = StyleSheet.create({})