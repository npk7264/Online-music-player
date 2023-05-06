import { FlatList } from 'react-native'
import React from 'react'
import AddSongItem from './AddSongItem'
const FlatListAddSongItem = ({ data }) => {
    return (
        <>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <AddSongItem
                        info={item}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
        </>
    )
}

export default FlatListAddSongItem;
