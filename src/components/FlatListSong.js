import { StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import OptionModal from './OptionModal'
import SongItem from './SongItem'
const FlatListSong = ({ songs }) => {
    const [optionModalVisible, setOptionModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    return (
        <>
            <FlatList
                data={songs}
                renderItem={({ item }) => (
                    <SongItem
                        info={item}
                        onPressOptionModal={() => {
                            setOptionModalVisible(true);
                            setCurrentItem(item);
                        }}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
            <OptionModal
                options={[
                    {
                        title: "Play Next",
                        icon: "keyboard-tab",
                        onPress: (item) => {
                            console.log(`play next ${item.name}`);
                        },
                    },
                    {
                        title: "Add to playlist",
                        icon: "add-circle-outline",
                        onPress: (item) => {
                            console.log(`add playlist ${item.name}`);
                        },
                    },
                ]}
                currentItem={currentItem}
                onClose={() => setOptionModalVisible(false)}
                visible={optionModalVisible}
            />
        </>
    )
}

export default FlatListSong

const styles = StyleSheet.create({})