import { FlatList, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import OptionModal from './OptionModal'
import SongItem from './SongItem'
import { optionSong } from '../utils/optionModal'
const FlatListSong = ({ songs }) => {
    const [optionModalVisible, setOptionModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    return (
        <SafeAreaView>
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
                options={optionSong}
                currentItem={currentItem}
                onClose={() => setOptionModalVisible(false)}
                visible={optionModalVisible}
            />
        </SafeAreaView>
    )
}

export default FlatListSong
