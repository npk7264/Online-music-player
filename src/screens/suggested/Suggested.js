import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useContext, useState } from 'react'

import ListSuggest from './ListSuggest'

import { ThemeContext } from '../../context/ThemeContext'
import { DataContext } from '../../context/DataContext'
import { PlaylistContext } from '../../context/PlaylistContext'

// test data
import { songs } from '../../../data'
const data = [{
    id: 1,
    title: 'Nghe gần đây',
    data: songs
},
{
    id: 6,
    title: 'Đang theo dõi',
    data: songs,
},
{
    id: 5,
    title: 'Gợi ý',
    data: songs
},
{
    id: 2,
    title: 'Thịnh hành',
    data: songs
},
{
    id: 3,
    title: 'Ca sĩ yêu thích',
    data: songs
},
{
    id: 4,
    title: 'Top 10',
    data: songs
},
]

const Suggested = () => {
    const { colors } = useContext(ThemeContext);
    const { suggestData, listSong, listSinger, listGenre, ArtistFollowing } = useContext(DataContext);
    const { recentData } = useContext(PlaylistContext);


    const updatedData = data.map((item) => {
        if (item.id === 1)
            return {
                ...item,
                data: recentData.slice(0, 6),
            }
        else if (item.id === 2)
            return {
                ...item,
                data: listSong.slice(0, 6),
            }
        else if (item.id === 3)
            return {
                ...item,
                data: listSinger.slice(0, 6),
            }
        else if (item.id === 4)
            return {
                ...item,
                data: listGenre.slice(0, 6),
            }
        else if (item.id === 5)
            return {
                ...item,
                data: suggestData,
            }
        if (item.id === 6)
            return {
                ...item,
                data: ArtistFollowing.slice(0, 6),
            }
    }
    )

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <FlatList
                data={updatedData}
                renderItem={({ item }) => <ListSuggest title={item.title} data={item.data} id={item.id} />}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default Suggested

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})