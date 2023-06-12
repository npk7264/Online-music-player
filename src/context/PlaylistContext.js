import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, db } from "../services/firebaseConfig";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    query,
    where,
    documentId
} from "firebase/firestore";
import { AudioContext } from './AudioContext';


export const PlaylistContext = createContext();


export const PlaylistProvider = ({ children }) => {
    const { userId, songData } = useContext(AudioContext);

    const [idPlaylist, setIdPlaylist] = useState('');
    const [songs, setSongs] = useState([]);
    const [playlistData, setPlaylistData] = useState({});
    const [renderSong, setRenderSong] = useState([]);
    const [searchText, setSearchText] = useState("");


    //get song by filter from listSong of playlistData and songData from fireStore 
    const filterSong = async (listSong) => {
        // const song = songData?.filter(obj => listSong.includes(obj.id));
        // setRenderSong(song);
        // console.log('filterSong')
        if (listSong.length > 0)
            try {
                const songsRef = collection(db, "songs");
                const q = query(songsRef, where(documentId(), "in", listSong));

                const querySnapshot = await getDocs(q);

                const songsArray = await Promise.all(
                    querySnapshot.docs.map((docRef) => {
                        const songData = {
                            id: docRef.id,
                            name: docRef.data().name,
                            image: docRef.data().image,
                            public: docRef.data().public,
                            singer: docRef.data().artists,
                            album: docRef.data().album,
                            uri: docRef.data().url,
                            lyric: docRef.data().lyric,
                            view: docRef.data().view
                        }
                        return songData;
                    })
                );
                const sortedSongs = songsArray.sort((a, b) => {
                    const indexA = listSong.indexOf(a.id);
                    const indexB = listSong.indexOf(b.id);
                    return indexA - indexB;
                })
                setRenderSong(sortedSongs);
                // console.log(songsArray);
            } catch (error) {
                console.log("Fail to fetch playlist songs", error);
            }
    }

    const updatePlaylist = async (id) => {
        setIdPlaylist(id)
        setRenderSong([]);
        await fetchPlaylist(id);
    }
    const updateListSong = (song) => { setSongs([...songs, song]) }

    const setListSong = (list) => {
        setSongs([...list])
        // console.log('set listsong')
    }
    const handleAddSong = async (idSong) => {

        const index = songs.indexOf(idSong);
        if (index > -1) {
            const newSongs = [...songs];
            newSongs.splice(index, 1);
            setSongs(newSongs);
            // console.log(newSongs)
            await DeleteSongToPlaylist(newSongs);
        }
        else {
            AddSongToPlaylist(idSong);
        }
    }


    const fetchPlaylist = async (id) => {
        const playlistArray = await getDoc(doc(db, `users/${userId}/playlist/${id}`));
        setPlaylistData({ ...playlistArray.data() });
        // console.log('fetch ne');

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
            alert("Failed to add to playlist!", e);
        }
    };

    const DeleteSongToPlaylist = async (newListSong) => {
        const docRef = doc(db, `users/${userId}/playlist/${idPlaylist}`);
        try {
            //setSongs([...songs, idSong]);
            await updateDoc(docRef, {
                listSong: [...newListSong],
                numSong: newListSong.length,
            });
        } catch (e) {
            alert("Failed to delete to playlist!", e);
        }
    }

    const theme = {
        idPlaylist: idPlaylist,
        listSong: songs,
        playlistData: playlistData,
        renderSong: renderSong,
        searchText: searchText,
        setSearchText,
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
