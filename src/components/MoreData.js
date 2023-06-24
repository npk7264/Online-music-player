import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { color } from '../constants/color';
import { ThemeContext } from '../context/ThemeContext';
const MoreData = ({ loadAll, handleLoadMore }) => {
    const theme = useContext(ThemeContext);
    if (!loadAll) {
        return (
            <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
                <Text style={styles.loadMoreButtonText}>{theme.language.seeMore}</Text>
            </TouchableOpacity>
        );
    }

    return null;
}

export default MoreData

const styles = StyleSheet.create({
    loadMoreButton: {
        marginVertical: 16,
        alignItems: 'center',
    },
    loadMoreButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.primary,
    },
})