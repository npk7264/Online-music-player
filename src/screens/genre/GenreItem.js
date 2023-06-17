import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from '../../context/ThemeContext';

const GenreItem = ({ name, id, image }) => {
    const navigation = useNavigation();
    const { colors } = useContext(ThemeContext);
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('GenreDetail', { id, name, image, type: "all" })}>
            {/* Image */}
            <Image
                source={{ uri: image }}
                style={styles.poster}
            />
            {/* info */}
            <View style={styles.info}>
                <Text style={[styles.name, { color: colors.text }]} >Nhạc {name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default GenreItem

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        // width: '40%',
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        // margin: 5,
        // width: '45%',
    },
    poster: {
        width: 150,
        height: 150,
        borderRadius: 15
    },
    info: {
        marginTop: 5,
        // backgroundColor: 'red',
        width: 150,
    },
    name: {
        fontSize: 16,
        fontWeight: '800',
        textAlign: 'center'
    },
    singer: {
        fontSize: 12,
        color: 'gray',
    },
    numSong: {
        fontSize: 12,
        color: 'gray',
    },
})