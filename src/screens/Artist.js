import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import ArtistItem from "../components/ArtistItem";
import OptionModal from "../components/OptionModal";
import { ThemeContext } from "../context/ThemeContext";
// import { AudioContext } from "../context/AudioContext";
import { DataContext } from "../context/DataContext";
import { FontAwesome } from "@expo/vector-icons";
import { optionSinger } from "../utils/optionModal"
import MoreData from "../components/MoreData";

const Artist = () => {
  const { colors } = useContext(ThemeContext);
  // const { singerData } = useContext(AudioContext);
  const { listSinger, loadedAllSinger, handleLoadMoreSinger } = useContext(DataContext);
  const [currentSinger, setCurrentSinger] = useState(null);
  const [optionModalVisible, setOptionModalVisible] = useState(false);

  const renderMoreData = () => {
    return <MoreData loadAll={loadedAllSinger} handleLoadMore={handleLoadMoreSinger} />
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* <View
        style={{
          height: 50,
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "500", color: colors.text }}>
            {singerData?.length} ca sĩ
          </Text>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: colors.primary,
              marginRight: 10,
            }}
          >
            Sắp xếp
          </Text>
          <View>
            <FontAwesome name="sort" size={30} color={colors.primary} />
          </View>
        </TouchableOpacity>
      </View> */}

      {/* artist list */}
      <FlatList
        data={listSinger}
        renderItem={({ item }) => (
          <ArtistItem
            id={item.id}
            name={item.name}
            image={item.image}
            follower={item.follower}
            onPressOptionModal={() => {
              setOptionModalVisible(true);
              setCurrentSinger(item);
            }}
          />
        )}
        ListFooterComponent={renderMoreData}
        keyExtractor={(item) => item.id}
      />

      <OptionModal
        options={optionSinger}
        currentItem={currentSinger}
        onClose={() => setOptionModalVisible(false)}
        visible={optionModalVisible}
      />
    </View>
  );
};

export default Artist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
