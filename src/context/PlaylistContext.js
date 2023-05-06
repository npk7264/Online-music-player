import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from "../services/firebaseConfig";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
} from "firebase/firestore";
export const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
    const [idPlaylist, setIdPlaylist] = useState('');
    const [songs, setSongs] = useState([]);

    const updatePlaylist = (id) => { setIdPlaylist(id) }
    const updateListSong = (song) => { setSongs([...songs, song]) }
    const setListSong = (list) => { setSongs([...songs, ...list]) }
    const [playlistData, setPlaylistData] = useState([]);
    const handleAddSong = (idSong) => {

        const index = songs.indexOf(idSong);
        if (index > -1) {
            const newSongs = [...songs];
            newSongs.splice(index, 1);
            setSongs(newSongs);
            console.log(newSongs)
        }
        else {
            setSongs([...songs, idSong]);
            console.log([...songs, idSong]);
        }
    }

    const fetchPlaylist = async () => {
        const userId = 'MMp5BVLgmzPfKvaiDKSOrewVVvD3';
        const playlistArray = await getDoc(doc(db, `users/${userId}/playlist/${idPlaylist}`));
        setPlaylistData(playlistArray.data());
        setListSong([...playlistArray.data().listSong])
    };

    useEffect(() => {
        if (idPlaylist !== '') {
            fetchPlaylist()
            console.log('fetch playlist')
        }
    }, [idPlaylist]);

    const theme = {
        idPlaylist: idPlaylist,
        listSong: songs,
        playlistData: playlistData,
        updatePlaylist,
        updateListSong,
        handleAddSong,
        setListSong
    };

    return (
        <PlaylistContext.Provider value={theme}>{children}</PlaylistContext.Provider>
    );
};
