import { StyleSheet, View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import { AudioContext } from '../../../context/AudioContext'
import FlatListAddSongItem from '../FlatListAddSongItem'
import { fetchFavorite } from '../../../utils/FirebaseHandler'
import { PlaylistContext } from '../../../context/PlaylistContext'

const Favorites = () => {
    const { colors } = useContext(ThemeContext);
    const { userId } = useContext(AudioContext);
    const { searchText } = useContext(PlaylistContext);
    const [searchResult, setSearchResult] = useState([]);
    const [songData, setSongData] = useState([]);
    useEffect(() => {

        const data = songData.filter((item) => {
            if (searchText != "")
                return item.name?.toLowerCase().includes(searchText?.toLowerCase());
        });
        setSearchResult(data);
    }, [searchText]);

    useEffect(() => {
        const fetchData = async () => {
            const favorite = await fetchFavorite(userId);
            setSongData(favorite);
        }
        fetchData();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {searchResult.length != 0 && searchText != "" && <FlatListAddSongItem data={searchResult} />}
            {searchText == "" && <FlatListAddSongItem data={songData} />}
            {searchText != "" && searchResult.length === 0 &&
                <View style={styles.nothingSearch}>
                    <Text style={[styles.textType, { color: colors.text }]}>Không tìm thấy kết quả nào</Text>
                </View>
            }
        </View>
    )
}
export default Favorites


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