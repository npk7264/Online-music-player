import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState, useContext } from "react";

import SearchBar from "../components/SearchBar";
import SongItem from "../components/SongItem";

import { AudioContext } from "../context/AudioContext";
import { ThemeContext } from "../context/ThemeContext";

import Icon from "react-native-vector-icons/FontAwesome";

const Chart = () => {
  const { songData } = useContext(AudioContext);
  const [filterTime, setFilterTime] = useState("day");
  const { colors } = useContext(ThemeContext);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar></StatusBar>

      <SearchBar title={"Nghe nhiều"} />

      <View
        style={{
          paddingHorizontal: 20,
          height: 60,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: colors.background,
        }}
      >
        <TouchableOpacity
          style={{ alignItems: "center", justifyContent: "space-evenly" }}
          onPress={() => {
            setFilterTime("day");
          }}
        >
          <Text style={{ fontSize: 18, color: colors.text }}>Hôm nay</Text>
          <Icon
            name={filterTime === "day" ? "circle" : "circle-o"}
            size={25}
            color={colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center", justifyContent: "space-evenly" }}
          onPress={() => {
            setFilterTime("month");
          }}
        >
          <Text style={{ fontSize: 18, color: colors.text }}>Trong tháng</Text>
          <Icon
            name={filterTime === "month" ? "circle" : "circle-o"}
            size={25}
            color={colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: "center", justifyContent: "space-evenly" }}
          onPress={() => {
            setFilterTime("year");
          }}
        >
          <Text style={{ fontSize: 18, color: colors.text }}>Trong năm</Text>
          <Icon
            name={filterTime === "year" ? "circle" : "circle-o"}
            size={25}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={songData}
        renderItem={({ item }) => (
          <SongItem
            info={item}
            time={item.time}
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

export default Chart;

const styles = StyleSheet.create({});
