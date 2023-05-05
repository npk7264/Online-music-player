import React, { createContext, useState, useEffect } from 'react';
import { lightColors, darkColors } from '../constants/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // save dataDarkMode in asyncStorage
    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('darkMode', jsonValue);
        } catch (e) {
            // saving error
        }
    };

    // get darkMode from AsyncStorage
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('darkMode');
            return jsonValue != null ? JSON.parse(jsonValue) : false;
        } catch (e) {
            // error reading value
        }
    };

    useEffect(() => {
        const getInitialData = async () => {
            const darkMode = await getData();
            setIsDarkMode(darkMode);
        };
        getInitialData();
    }, []);

    const toggleTheme = async () => {
        const newIsDarkMode = !isDarkMode;
        storeData(newIsDarkMode);
        setIsDarkMode(newIsDarkMode);
    };

    const theme = {
        colors: isDarkMode ? darkColors : lightColors,
        darkMode: isDarkMode,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};
