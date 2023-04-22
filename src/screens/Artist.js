import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import ArtistItem from "../components/ArtistItem";
import { artist } from "../../data";
const Artist = () => {
  return (
    <View style={styles.container}>
      {/* artist list */}
      <FlatList
        data={artist}
        renderItem={({ item }) => (
          <ArtistItem
            name={item.name}
            songs={item.songs}
            onPressOptionModal={() => {
              setOptionModalVisible(true);
              setCurrentItem(item);
            }}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Artist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: "center",
    // alignItems: "center",
  },
});
