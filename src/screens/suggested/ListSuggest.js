import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import React, { useContext } from 'react'

import ItemSuggest from './ItemSuggest'
import { ThemeContext } from '../../context/ThemeContext'



const ListSuggest = ({ title, data }) => {
    const { colors } = useContext(ThemeContext);
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={[styles.textTitle, { color: colors.text }]}> {title}</Text>
                <TouchableOpacity >
                    <Text style={[styles.viewAll, { color: colors.primary }]}>Xem tất cả</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) => <ItemSuggest item={item} />}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default ListSuggest

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20
    },
    title: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 15,
        marginVertical: 10,
    },
    textTitle: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    viewAll: {
        fontSize: 16
    },
})