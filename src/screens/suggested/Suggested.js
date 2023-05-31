import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useContext, useState } from 'react'

import ListSuggest from './ListSuggest'

import { ThemeContext } from '../../context/ThemeContext'

// test data
import { songs } from '../../../data'
const data = [{
    id: 1,
    title: 'Nghe gần đây',
    data: songs
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
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <FlatList
                data={data}
                renderItem={({ item }) => <ListSuggest title={item.title} data={item.data} />}
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