import { FlatList } from 'react-native'
import React, { useContext } from 'react'
import AddSongItem from './AddSongItem'


const FlatListAddSongItem = ({ data, RenderMoreData, loadAll, handleLoadMore }) => {
    const renderMoreData = () => {
        if (RenderMoreData) {
            return <RenderMoreData loadAll={loadAll} handleLoadMore={handleLoadMore} />;
        }
        return null;
    };
    return (
        <>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <AddSongItem
                        info={item}
                    />
                )}
                ListFooterComponent={renderMoreData}
                keyExtractor={(item) => item.id}
            />
        </>
    )
}

export default FlatListAddSongItem;
