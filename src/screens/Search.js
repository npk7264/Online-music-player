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
import FlatListSong from "../components/FlatListSong";
import ArtistItem from "../components/ArtistItem";
import { color } from "../constants/color";

import { searchSinger, searchSong } from "../utils/FirebaseHandler";

const Search = () => {
  const { colors, darkMode, language } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false); // focus TextInput
  const [searchText, setSearchText] = useState("");
  const { songData } = useContext(AudioContext);
  const [searchType, setSearchType] = useState(0);
  const [result, setResult] = useState([]);

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
          placeholder="Tìm kiếm bài hát, nghệ sĩ,..."
          placeholderTextColor={colors.text}
          autoFocus={true}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChangeText={(text) => {
            setSearchText(text);
            if (searchType == 0) searchSong(text, setResult);
            else if (searchType == 1) searchSinger(text, setResult);
          }}
        />
      </View>

      <View style={[styles.searchType]}>
        <TouchableOpacity
          style={[
            styles.searchTypeItem,
            {
              backgroundColor:
                searchType === 0 ? colors.primary : colors.background,
            },
          ]}
          onPress={() => {
            setResult([]);
            setSearchType(0);
            searchSong(searchText, setResult);
          }}
        >
          <Text
            style={[
              styles.textType,
              { color: searchType === 0 ? "white" : colors.primary },
            ]}
          >
            {language.song}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.searchTypeItem,
            {
              backgroundColor:
                searchType === 1 ? colors.primary : colors.background,
            },
          ]}
          onPress={() => {
            setResult([]);
            setSearchType(1);
            searchSinger(searchText, setResult);
          }}
        >
          <Text
            style={[
              styles.textType,
              { color: searchType === 1 ? "white" : colors.primary },
            ]}
          >
            {language.artist}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.searchTypeItem,
            {
              backgroundColor:
                searchType === 2 ? colors.primary : colors.background,
            },
          ]}
          onPress={() => setSearchType(2)}
        >
          <Text
            style={[
              styles.textType,
              { color: searchType === 2 ? "white" : colors.primary },
            ]}
          >
            Album
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Result */}
      {result.length != 0 && searchType == 0 && <FlatListSong songs={result} />}
      {result.length != 0 && searchType == 1 && (
        <FlatList
          data={result}
          renderItem={({ item }) => (
            <ArtistItem
              id={item.id}
              name={item.name}
              image={item.image}
              // follower={item.follower}
              onPressOptionModal={() => {
                setOptionModalVisible(true);
                setCurrentSinger(item);
              }}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}

      {searchText != "" && result.length === 0 && (
        <View style={styles.nothingSearch}>
          <Text style={[styles.textType, { color: colors.text }]}>
            Không tìm thấy kết quả nào
          </Text>
        </View>
      )}
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
  searchType: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    // backgroundColor: 'red',
    marginBottom: 10,
  },
  searchTypeItem: {
    borderColor: color.primary,
    borderWidth: 2,
    borderRadius: 15,
    height: 36,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  textType: {
    fontSize: 15,
    fontWeight: 500,
  },
  nothingSearch: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
