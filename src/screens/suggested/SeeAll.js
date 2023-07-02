import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";

import ItemSuggest from "./ItemSuggest";
import { ThemeContext } from "../../context/ThemeContext";
import {
  fetchSongListFromGenreStatistics,
  fetchSingerAllLimit,
} from "../../utils/FirebaseHandler";
import { FontAwesome } from "@expo/vector-icons";
import { auth } from "../../services/firebaseConfig";
import OptionModal from "../../components/OptionModal";
import { optionSinger, optionSong } from "../../utils/optionModal";
import { DataContext } from "../../context/DataContext";
import BackBar from "../../components/BackBar";

const SeeAll = ({ route }) => {
  const { id, title, data } = route.params;
  const { colors } = useContext(ThemeContext);
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <BackBar title={title} />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ItemSuggest
            item={item}
            type={id == 6 || id == 3 ? "singer" : id == 4 ? "genre" : "song"}
            data={data}
            onPressOptionModal={() => {
              setOptionModalVisible(true);
              setCurrentItem(item);
            }}
          />
        )}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => item.id}
      />
      <OptionModal
        type={id === 6 || id === 3 ? "singer" : "song"}
        options={id == 6 || id == 3 ? optionSinger : optionSong}
        currentItem={currentItem}
        onClose={() => setOptionModalVisible(false)}
        visible={optionModalVisible}
      />
    </View>
  );
};

export default SeeAll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
