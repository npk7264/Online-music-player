import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import SongItem from "../components/SongItem.js"
import OptionModal from "../components/OptionModal.js";


const songs = [
  {
    id: 1,
    song: 'Nang am xa dan',
    singer: 'Son Tung',
    time: '2:20'
  },
  {
    id: 2,
    song: 'Con buom xinh',
    singer: 'Ho Quang Hieu',
    time: '3:10'
  },
  {
    id: 3,
    song: 'Big city boy',
    singer: 'BinZ',
    time: '5:00'
  },
  {
    id: 4,
    song: 'Ngu mot minh',
    singer: 'Hieu Thu Hai',
    time: '4:40'
  },
]

const Song = () => {
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        renderItem={({ item }) =>
          <SongItem
            song={item.song}
            singer={item.singer}
            time={item.time}
            onPressOptionModal={() => {
              setOptionModalVisible(true);
              setCurrentItem(item);
            }}
          />
        }
        keyExtractor={item => item.id}
      />
      <OptionModal
        options={[
          {
            title: 'Add to playlist',
            onPress: () => { console.log('add playlist') },
          }]}
        currentItem={currentItem}
        onClose={() => setOptionModalVisible(false)}
        visible={optionModalVisible} />
    </View>
  );
};

export default Song;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: "center",
    // alignItems: "center",
  },
});
