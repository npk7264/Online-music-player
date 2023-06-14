import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, SafeAreaView, StatusBar } from 'react-native'
import React, { useContext, useState } from 'react'

import ItemSuggest from './ItemSuggest'
import { ThemeContext } from '../../context/ThemeContext'
import { fetchSongListFromGenreStatistics } from '../../utils/FirebaseHandler'
import { FontAwesome } from "@expo/vector-icons";
import { auth } from '../../services/firebaseConfig'
import OptionModal from '../../components/OptionModal'
import { optionSinger, optionSong } from '../../utils/optionModal'

const ListSuggest = ({ title, data, id }) => {
    const { colors } = useContext(ThemeContext);
    const [listSong, setListSong] = useState(data);
    const [showAll, setShowAll] = useState(false);
    const [optionModalVisible, setOptionModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);


    const closeModal = () => {
        setShowAll(false);
    };

    const openModal = () => {
        setShowAll(true);
    };

    const handleSeeALl = async () => {
        let allData
        if (id === 5) {
            allData = await fetchSongListFromGenreStatistics(auth.currentUser.uid, 20);
        }
        setListSong(allData);
        openModal();
    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.title}>
                <Text style={[styles.textTitle, { color: colors.text }]}> {title}</Text>
                <TouchableOpacity onPress={handleSeeALl} >
                    <Text style={[styles.viewAll, { color: colors.primary }]}>Xem tất cả</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) => <ItemSuggest item={item} type={id !== 3 ? 'song' : 'singer'} data={data} onPressOptionModal={() => {
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

            <Modal visible={showAll} transparent={true} statusBarTranslucent >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {/* Nội dung của modal */}
                        <View style={styles.viewTitle}>
                            <TouchableOpacity
                                style={{ paddingHorizontal: 20 }}
                                onPress={closeModal}
                            >
                                <FontAwesome name="arrow-left" size={24} color={colors.text} />
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>{title}</Text>
                        </View>

                        <FlatList
                            data={listSong}
                            renderItem={({ item }) =>
                                <ItemSuggest
                                    item={item}
                                    type={id !== 3 ? 'song' : 'singer'}
                                    data={listSong}
                                    onPressOptionModal={() => {
                                        setOptionModalVisible(true);
                                        setCurrentItem(item);
                                    }} />}
                            horizontal={false}
                            numColumns={2}
                            keyExtractor={item => item.id}
                        />
                        {/* <OptionModal
                            options={id !== 3 ? optionSong : optionSinger}
                            currentItem={currentItem}
                            onClose={() => setOptionModalVisible(false)}
                            visible={optionModalVisible}
                        /> */}
                    </View>
                </View>
            </Modal>
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
        // alignItems: 'center',
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