import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AlbumItem from "./AlbumItem";

import { ThemeContext } from "../context/ThemeContext";
import { DataContext } from "../context/DataContext";

import MoreData from "./MoreData";

import { FontAwesome } from "@expo/vector-icons";

const Albums = () => {
  const { colors } = useContext(ThemeContext);
  const { listAlbum, loadedAllAlbum, handleLoadMoreAlbum } =
    useContext(DataContext);

  const renderMoreData = () => {
    return (
      <MoreData loadAll={loadedAllAlbum} handleLoadMore={handleLoadMoreAlbum} />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={listAlbum}
        renderItem={({ item }) => (
          <AlbumItem
            id={item.id}
            name={item.name}
            singer={item.singer}
            idSinger={item.idSinger}
            image={item.image}
          />
        )}
        ListFooterComponent={renderMoreData}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Albums;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
