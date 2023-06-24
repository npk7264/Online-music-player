import React, { createContext, useContext } from 'react';
import { PlaylistContext } from './PlaylistContext';
import { NotificationContext } from './NotifyContext';

export const CombinedContext = createContext();

export const CombinedProvider = ({ children }) => {
    const contextNotify = useContext(NotificationContext);
    const contextPlaylist = useContext(PlaylistContext);

    return (
        <CombinedContext.Provider value={{ contextNotify, contextPlaylist }}>{children}</CombinedContext.Provider>
    );
};
