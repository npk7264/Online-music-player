import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'

const ItemSuggest = ({ item }) => {
    const { colors } = useContext(ThemeContext);
    return (
        <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.poster} />
            <Text style={[styles.text, { color: colors.text }]}>{item.name}</Text>
        </View>
    )
}

export default ItemSuggest

const styles = StyleSheet.create({
    container: {
        width: 140,
        alignItems: "center",
        marginHorizontal: 10
    },
    poster: {
        height: 140,
        width: '100%',
        borderRadius: 20
    },
    text: {
        marginTop: 10,
    },
})