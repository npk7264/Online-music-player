import { StyleSheet, View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import { PlaylistContext } from '../../../context/PlaylistContext'
import FlatListAddSongItem from '../FlatListAddSongItem'



const SongInPlayList = () => {
    const { colors } = useContext(ThemeContext);
    const { renderSong, searchText } = useContext(PlaylistContext);
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {

        const data = renderSong.filter((item) => {
            if (searchText != "")
                return item.name?.toLowerCase().includes(searchText?.toLowerCase());
        });
        setSearchResult(data);
    }, [searchText]);


    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {searchResult.length != 0 && searchText != "" && <FlatListAddSongItem data={searchResult} />}
            {searchText == "" && <FlatListAddSongItem data={renderSong} />}
            {searchText != "" && searchResult.length === 0 &&
                <View style={styles.nothingSearch}>
                    <Text style={[styles.textType, { color: colors.text }]}>Không tìm thấy kết quả nào</Text>
                </View>
            }
        </View>
    )
}


export default SongInPlayList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textType: {
        fontSize: 15,
    },
    nothingSearch: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})