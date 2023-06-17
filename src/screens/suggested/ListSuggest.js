import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, SafeAreaView, StatusBar } from 'react-native'
import React, { useContext, useState } from 'react'

import ItemSuggest from './ItemSuggest'
import { ThemeContext } from '../../context/ThemeContext'
import { fetchSongListFromGenreStatistics, fetchSingerAllLimit } from '../../utils/FirebaseHandler'
import { auth } from '../../services/firebaseConfig'
import OptionModal from '../../components/OptionModal'
import { optionSinger, optionSong } from '../../utils/optionModal'
import { DataContext } from '../../context/DataContext'
import { useNavigation } from "@react-navigation/native";


const ListSuggest = ({ title, data, id }) => {
    const navigation = useNavigation();
    const { colors } = useContext(ThemeContext);
    const contextData = useContext(DataContext);
    const [optionModalVisible, setOptionModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    const handleSeeALl = async () => {
        let data;
        if (id === 5) {
            data = await fetchSongListFromGenreStatistics(auth.currentUser.uid, 20);
        }
        if (id === 2) {
            data = contextData.listSong.slice(0, 10);
        }
        if (id === 3) {
            data = await fetchSingerAllLimit(10);
        }
        if (id === 4) {
            data = contextData.listGenre;
        }
        navigation.navigate('SeeAll', { id, title, data })

    }

    return (
        <SafeAreaView style={[styles.container, { marginTop: id === 1 ? 10 : 0 }]}>
            <View style={styles.title}>
                <Text style={[styles.textTitle, { color: colors.text }]}> {title}</Text>
                <TouchableOpacity onPress={handleSeeALl} >
                    <Text style={[styles.viewAll, { color: colors.primary }]}>Xem tất cả</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) => <ItemSuggest item={item} type={id !== 3 ? (id !== 4 ? 'song' : 'genre') : 'singer'} data={data} onPressOptionModal={() => {
                    setOptionModalVisible(true);
                    setCurrentItem(item);
                }} />}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
            />
            <OptionModal
                options={id !== 3 ? optionSong : optionSinger}
                currentItem={currentItem}
                onClose={() => setOptionModalVisible(false)}
                visible={optionModalVisible}
            />
        </SafeAreaView>
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
        // marginVertical: 10,
    },
    textTitle: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    viewAll: {
        fontSize: 16
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        // width: '100%',
        height: '100%',
    },
    viewTitle: {
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "",
        marginTop: 10,
    },
    modalTitle: {
        fontSize: 25,
        textAlignVertical: 'center'
    },
    closeButton: {
        fontSize: 16,
        color: 'blue',
        marginTop: 20,
    },
})