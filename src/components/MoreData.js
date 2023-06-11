import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { color } from '../constants/color';

const MoreData = ({ loadAll, handleLoadMore }) => {
    if (!loadAll) {
        return (
            <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
                <Text style={styles.loadMoreButtonText}>Xem thêm</Text>
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