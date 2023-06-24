import {
  StyleSheet,
  View,
} from "react-native";
import React, { useContext } from "react";


import FlatListSong from "../components/FlatListSong.js";

import { ThemeContext } from "../context/ThemeContext.js";
import { DataContext } from "../context/DataContext.js";

import MoreData from "../components/MoreData.js";

const Song = () => {
  const { colors } = useContext(ThemeContext);
  const { listSong, loadedAllSongs, handleLoadMoreSong } = useContext(DataContext);

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
            {songData.length} bài hát
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

      {/* Song list */}
      <FlatListSong songs={listSong} RenderMoreData={MoreData} loadAll={loadedAllSongs} handleLoadMore={handleLoadMoreSong} />
    </View>
  );
};

export default Song;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
