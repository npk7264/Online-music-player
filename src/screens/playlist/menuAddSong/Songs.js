import { StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
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
    const [songData, setSongData] = useState([]);

    // fetch song
    const fetchSongs = async () => {
        const querySnapshot = await getDocs(collection(db, "songs"));
        const songsArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setSongData(songsArray);
    };

    useEffect(() => {
        fetchSongs();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <FlatListAddSongItem data={songData} />
        </View>
    )
}

export default Songs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})