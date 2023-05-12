import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";
import { useState, useContext } from "react";

import SongItem from "../components/SongItem";

import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { ThemeContext } from "../context/ThemeContext";
import { AudioContext } from "../context/AudioContext";

import { color } from "../constants/color";

const Search = () => {
  const { colors, darkMode } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false); // focus TextInput
  const [searchText, setSearchText] = useState("");
  const { songData } = useContext(AudioContext);

  const searchResult = songData.filter((item) => {
    if (searchText != "")
      return item.name.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        {/* Back Button */}
        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <FontAwesome name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        {/* Search Input */}
        <TextInput
          style={[
            styles.searchInput,
            {
              borderColor: isFocused ? "#ff8216" : null,
              backgroundColor: isFocused
                ? darkMode
                  ? "#2a221f"
                  : "#fff5ed"
                : darkMode
                ? "#1f222a"
                : "#f5f5f6",
              borderWidth: isFocused ? 1 : 0,
              color: colors.text,
            },
          ]}
          placeholder="Bài hát, nghệ sĩ,..."
          placeholderTextColor={colors.text}
          autoFocus={true}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(text) => {
            setSearchText(text);
            console.log(text);
          }}
        />
      </View>

      {/* Search Result */}
      <FlatList
        data={searchResult}
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
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchBar: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 20,
    paddingVertical: 10,
    height: 60,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 15,
  },
});
