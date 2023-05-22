import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const ItemSuggest = ({ item }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.poster} />
            <Text style={[styles.text]}>{item.name}</Text>
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