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
import MiniPlayer from "../components/MiniPlayer";

import { AudioContext } from "../context/AudioContext";
import { ThemeContext } from "../context/ThemeContext";

import Icon from "react-native-vector-icons/FontAwesome";
import { VictoryChart, VictoryBar } from 'victory-native';


const Chart = () => {
  const { songData, soundObj, currentAudio } = useContext(AudioContext);
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
        {/* <VictoryChart
          height={300}
          padding={{ top: 20, bottom: 50, left: 50, right: 50 }}
        >
          <VictoryBar
            data={songData}
            x="name"
            y="view"
            style={{
              data: { fill: '#c43a31' },
              labels: { fontSize: 10 }
            }}
          />
        </VictoryChart> */}
      </View>

      {/* <FlatList
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
      /> */}

      {/* {currentAudio && <MiniPlayer />} */}
    </SafeAreaView>
  );
};

export default Chart;

const styles = StyleSheet.create({});
