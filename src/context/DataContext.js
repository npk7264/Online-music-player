import React, { createContext, useState, useEffect } from 'react';
import { loadSongs } from '../utils/FirebaseHandler';
export const DataContext = createContext();

export const DataProvider = ({ children, songData, singerData, albumData, lastSong }) => {
    const [listSong, setListSong] = useState(songData || []);
    const [loadedAllSongs, setLoadedAllSongs] = useState(false);
    const [listSinger, setListSinger] = useState(singerData || []);
    const [listAlbum, setListAlbum] = useState(albumData || []);
    const [lastVisibleSong, setLastVisibleSong] = useState(lastSong || null);


    // event press moreSong
    const handleLoadMoreSong = async () => {
        const limitSong = 10;
        const [loadSong, lastVisible] = await loadSongs(listSong, limitSong, lastVisibleSong);
        // console.log(loadSong);
        if (loadSong.length < limitSong)
            setLoadedAllSongs(true);
        setLastVisibleSong(lastVisible);
        setListSong([...listSong, ...loadSong]);
    }

    const data = {
        listSong: listSong,
        loadedAllSongs: loadedAllSongs,
        listAlbum: listAlbum,
        listSinger: listSinger,
        setListSinger,
        setListSong,
        setListAlbum,
        handleLoadMoreSong,
    };

    return (
        <DataContext.Provider value={data}>{children}</DataContext.Provider>
    );
};
