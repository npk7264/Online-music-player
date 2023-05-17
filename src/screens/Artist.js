import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import ArtistItem from "../components/ArtistItem";
import { artist } from "../../data";
import OptionModal from "../components/OptionModal";
import { ThemeContext } from "../context/ThemeContext";
import { FontAwesome } from "@expo/vector-icons";
import { optionSinger } from "../utils/optionModal"

const Artist = () => {
  const { colors } = useContext(ThemeContext);
  const [currentSinger, setCurrentSinger] = useState(null);
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={{
          height: 50,
          paddingHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "500", color: colors.text }}>
            20 ca sĩ
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
      </View>



      {/* artist list */}
      <FlatList
        data={artist}
        renderItem={({ item }) => (
          <ArtistItem
            name={item.name}
            songs={item.songs}
            onPressOptionModal={() => {
              setOptionModalVisible(true);
              setCurrentSinger(item);
            }}
          />
        )}
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
