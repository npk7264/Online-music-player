import { StyleSheet, View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import { PlaylistContext } from '../../../context/PlaylistContext'
import FlatListAddSongItem from '../FlatListAddSongItem'
import { auth, db } from "../../../services/firebaseConfig";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
} from "firebase/firestore";


const Songs = () => {
    const { colors } = useContext(ThemeContext);
    const { searchText } = useContext(PlaylistContext);
    const [songData, setSongData] = useState([]);
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {

        const data = songData.filter((item) => {
            if (searchText != "")
                return item.name?.toLowerCase().includes(searchText?.toLowerCase());
        });
        setSearchResult(data);
    }, [searchText]);

    // fetch song
    const fetchSongs = async () => {
        const querySnapshot = await getDocs(collection(db, "songs"));
        const songsArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            singer: doc.data().artists
        }));
        setSongData(songsArray);
    };

    useEffect(() => {
        fetchSongs();
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

export default Songs;

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