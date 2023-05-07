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

const userId = 'MMp5BVLgmzPfKvaiDKSOrewVVvD3';

export const PlaylistProvider = ({ children }) => {
    const [idPlaylist, setIdPlaylist] = useState('');
    const [songs, setSongs] = useState([]);
    const [playlistData, setPlaylistData] = useState({});
    const [songData, setSongData] = useState([]);
    const [renderSong, setRenderSong] = useState([]);

    //get song by filter from listSong of playlistData and songData from fireStore 
    const filterSong = (listSong) => {
        const song = songData?.filter(obj => listSong.includes(obj.id));
        setRenderSong(song);
        console.log('filterSong')
    }

    const updatePlaylist = (id) => {
        setIdPlaylist(id)
        fetchPlaylist(id);
    }
    const updateListSong = (song) => { setSongs([...songs, song]) }

    const setListSong = (list) => {
        setSongs([...list])
        console.log('set listsong')
    }
    const handleAddSong = (idSong) => {

        const index = songs.indexOf(idSong);
        if (index > -1) {
            const newSongs = [...songs];
            newSongs.splice(index, 1);
            setSongs(newSongs);
            console.log(newSongs)
        }
        else {
            AddSongToPlaylist(idSong);
        }
    }


    const fetchSongs = async () => {
        const querySnapshot = await getDocs(collection(db, "songs"));
        const songsArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setSongData(songsArray);
    };

    const fetchPlaylist = async (id) => {
        const playlistArray = await getDoc(doc(db, `users/${userId}/playlist/${id}`));
        setPlaylistData({ ...playlistArray.data() });
        console.log('fetch ne');
        // setListSong([...playlistArray.data().listSong])
        setListSong(playlistArray.data().listSong);
        filterSong(playlistArray.data().listSong);
        // console.log(renderSong.length, songs, playlistData)
    };

    const AddSongToPlaylist = async (idSong) => {

        const docRef = doc(db, `users/${userId}/playlist/${idPlaylist}`);
        try {
            setSongs([...songs, idSong]);
            await updateDoc(docRef, {
                listSong: [...songs, idSong],
                numSong: songs.length + 1,
            });
        } catch (e) {
            alert("Failed to save favorite song!", e);
        }
    };

    // useEffect(() => {
    //     const getInitialData = async () => {
    //         if (Object.keys(playlistData).length > 0) {
    //             await Promise.resolve(setListSong(playlistData.listSong));
    //             await Promise.resolve(filterSong());
    //             console.log(renderSong.length, songs, playlistData, "context")
    //         }
    //     };
    //     getInitialData();
    // }, [playlistData]);

    useEffect(() => {
        fetchSongs();
    }, []);

    // useEffect(() => {
    //     const getInitialData = async () => {
    //         if (idPlaylist !== '') {
    //             // setSongs([]);
    //             // setPlaylistData({});
    //             fetchPlaylist();
    //             console.log('fetch playlist')
    //         }
    //     };
    //     getInitialData();
    // }, [idPlaylist]);

    const theme = {
        idPlaylist: idPlaylist,
        listSong: songs,
        playlistData: playlistData,
        renderSong: renderSong,
        updatePlaylist,
        updateListSong,
        handleAddSong,
        setListSong,
        filterSong
    };

    return (
        <PlaylistContext.Provider value={theme}>{children}</PlaylistContext.Provider>
    );
};
