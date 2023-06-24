import React, { createContext, useState, useEffect } from 'react';
import { lightColors, darkColors } from '../constants/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [language, setLanguage] = useState("en");

    // save dataDarkMode in asyncStorage
    const storeDataDarkMode = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('darkMode', jsonValue);
        } catch (e) {
            // saving error
        }
    };

    // get darkMode from AsyncStorage
    const getDataDarkMode = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('darkMode');
            return jsonValue != null ? JSON.parse(jsonValue) : false;
        } catch (e) {
            console.log("🚀 ~ file: ThemeContext.js:28 ~ getDataDarkMode ~ e:", e)
            // error reading value
        }
    };

    // save dataDarkMode in asyncStorage
    const storeDataLanguage = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('language', jsonValue);
        } catch (e) {
            console.log("🚀 ~ file: ThemeContext.js:39 ~ storeDataLanguage ~ e:", e)
            // saving error
        }
    };

    // get darkMode from AsyncStorage
    const getDataLanguage = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('language');
            return jsonValue != null ? JSON.parse(jsonValue) : false;
        } catch (e) {
            console.log("🚀 ~ file: ThemeContext.js:50 ~ getDataLanguage ~ e:", e)
            // error reading value
        }
    };

    useEffect(() => {
        const getInitialData = async () => {
            const darkMode = await getDataDarkMode();
            setIsDarkMode(darkMode);
            const language = await getDataLanguage();
            setLanguage(language);
        };
        getInitialData();
    }, []);

    const toggleTheme = () => {
        const newIsDarkMode = !isDarkMode;
        storeDataDarkMode(newIsDarkMode);
        setIsDarkMode(newIsDarkMode);
    };
    const translations = {
        en: require("../constants/en.json"),
        vi: require("../constants/vi.json"),
    };

    const toggleLanguage = () => {
        storeDataLanguage(language === "en" ? "vi" : "en");
        setLanguage(language === "en" ? "vi" : "en");
    };

    const theme = {
        colors: isDarkMode ? darkColors : lightColors,
        darkMode: isDarkMode,
        language: language === "en" ? translations.en : translations.vi,
        checkLanguage: language,
        toggleLanguage,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};
