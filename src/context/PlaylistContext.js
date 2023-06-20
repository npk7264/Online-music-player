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
import { async } from '@firebase/util';


export const PlaylistContext = createContext();


export const PlaylistProvider = ({ children }) => {
    const { userId } = useContext(AudioContext);

    const [idPlaylist, setIdPlaylist] = useState('');
    const [songs, setSongs] = useState([]);
    const [playlistData, setPlaylistData] = useState({});
    const [renderSong, setRenderSong] = useState([]);
    const [searchText, setSearchText] = useState("");

    const [playlistArray, setPlaylistArray] = useState([]);//danh sách các playlist
    const [favoriteData, setFavoriteData] = useState([]);//danh sách các bàu hát yêu thích (info);
    const [recentData, setRecentData] = useState([]);//danh sachs lich su cac bai hat(info)
    const [favoriteID, setFavoriteID] = useState([]);//danh sach id bai hat yeu thich
    const [recentID, setRecentID] = useState([]);//danh sach id bai hat yeu thich

    //get song by filter from listSong of playlistData and songData from fireStore 
    const filterSong = async (listSong) => {

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

    }
    const handleAddSong = async (idSong) => {

        const index = songs.indexOf(idSong);
        if (index > -1) {
            const newSongs = [...songs];
            newSongs.splice(index, 1);
            setSongs(newSongs);

            await DeleteSongToPlaylist(newSongs);
        }
        else {
            AddSongToPlaylist(idSong);
        }
    }


    const fetchPlaylist = async (id) => {
        const playlistArray = await getDoc(doc(db, `users/${userId}/playlist/${id}`));
        setPlaylistData({ ...playlistArray.data() });

        setListSong(playlistArray.data().listSong);
        filterSong(playlistArray.data().listSong);

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


    const addOneSongToPlaylist = async (idSong, Playlist) => {
        const idPlaylist = Playlist.id;
        const docRef = doc(db, `users/${userId}/playlist/${idPlaylist}`);

        try {
            const playlistArray = await getDoc(docRef);
            console.log({ ...playlistArray.data() })
            const listSong = playlistArray.data().listSong;
            const index = listSong.length > 0 ? listSong.indexOf(idSong) : -1;
            if (index > -1) {
                listSong.splice(index, 1);

                Playlist.listSong = [...listSong];
                Playlist.numSong = listSong.length;
                try {
                    await updateDoc(docRef, {
                        listSong: [...listSong],
                        numSong: listSong.length,
                    });
                } catch (e) {
                    alert("Failed to delete to playlist!", e);
                }
                alert("Đã xóa khỏi playlist thành công");
            }
            else {
                try {
                    Playlist.listSong = [...listSong, idSong];
                    Playlist.numSong = listSong.length + 1;
                    await updateDoc(docRef, {
                        listSong: [...listSong, idSong],
                        numSong: listSong.length + 1,
                    });
                } catch (e) {
                    alert("Failed to add to playlist!", e);
                }
                alert("Đã thêm vào playlist thành công");
            }
        } catch (e) {
            console.log("🚀 ~ file: PlaylistContext.js:156 ~ addOneSongToPlaylist ~ e:", e)

        }
    }

    const theme = {
        recentID, setRecentID,
        favoriteID, setFavoriteID,
        recentData,
        favoriteData,
        playlistArray,
        idPlaylist: idPlaylist,
        listSong: songs,
        playlistData: playlistData,
        renderSong: renderSong,
        searchText: searchText,
        setRecentData,
        setFavoriteData,
        setPlaylistArray,
        setSearchText,
        updatePlaylist,
        updateListSong,
        handleAddSong,
        setListSong,
        filterSong,
        addOneSongToPlaylist
    };

    return (
        <PlaylistContext.Provider value={theme}>{children}</PlaylistContext.Provider>
    );
};
