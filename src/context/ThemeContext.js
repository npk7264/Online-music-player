import React, { createContext, useState } from 'react'
import { lightColors, darkColors } from '../constants/color'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const theme = {
        colors: isDarkMode ? darkColors : lightColors,
        darkMode: isDarkMode,
        toggleTheme: () => setIsDarkMode(!isDarkMode),
    }

    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    )
}
