import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";
import { useNavigation } from "@react-navigation/native";
import { selectSong } from "../../utils/AudioController";

const ItemSuggest = ({ item, type, data, onPressOptionModal }) => {
  const navigation = useNavigation();
  const { colors } = useContext(ThemeContext);
  const contextAudio = useContext(AudioContext);
  const handlePressItem = async () => {
    if (type === "song") {
      await selectSong(contextAudio, item, data);
      navigation.navigate("Player");
    }
    if (type === "singer") {
      const { id, name, image } = item;
      navigation.navigate("ArtistDetail", { id, name, image });
    }
    if (type === "genre") {
      const { id, name, image } = item;
      navigation.navigate("GenreDetail", {
        id,
        name: `Top 10 nhạc ${name} hay nhất`,
        image,
        type: "top",
      });
    }
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePressItem}
      onLongPress={onPressOptionModal}
    >
      <Image source={{ uri: item.image }} style={styles.poster} />
      <Text style={[styles.text, { color: colors.text }]}>
        {type === "genre" ? `Top 10 nhạc ${item.name} hay nhất` : item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default ItemSuggest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 140,
    alignItems: "center",
    // justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    // backgroundColor: 'red'
  },
  poster: {
    height: 140,
    width: 140,
    borderRadius: 20,
  },
  text: {
    width: 135,
    marginTop: 5,
    textAlign: "center",
  },
});
