import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  // Image
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { color } from "../constants/color";

import SearchBar from "../components/SearchBar";
import SongItem from "../components/SongItem";
import MiniPlayer from "../components/MiniPlayer";

import { AudioContext } from "../context/AudioContext";
import { ThemeContext } from "../context/ThemeContext";

import Icon from "react-native-vector-icons/FontAwesome";
import {
  VictoryChart,
  VictoryBar,
  VictoryAxis,
  VictoryTooltip,
} from "victory-native";
import { Image } from "react-native-svg";
import OptionModal from "../components/OptionModal";
import { optionSong } from "../utils/optionModal";
import { fetchTopSong } from "../utils/FirebaseHandler";

const Chart = () => {
  const context = useContext(AudioContext);
  const { songData, soundObj, currentAudio, updateState } = context;
  const { colors } = useContext(ThemeContext);
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // console.log("CHART render");

  async function updataSongData() {
    const songDataHaveUpdateView = await fetchTopSong();
    setSongs(songDataHaveUpdateView);
    setLoaded(true);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        await updataSongData();
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar></StatusBar>

      <SearchBar title={"Thịnh hành"} />

      {!loaded && <ActivityIndicator size="large" color={colors.primary} />}
      {loaded && (
        <View
          style={{
            // paddingHorizontal: 20,
            // height: 60,
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: colors.background,
          }}
        >
          <VictoryChart
            height={300}
            padding={{ top: 20, bottom: 50, left: 40, right: 40 }}
            domainPadding={20}
          >
            <VictoryAxis
              style={{
                tickLabels: {
                  fontSize: 10,
                  fill: colors.text,
                },
              }}
            />
            {/* <VictoryAxis tickLabelComponent={<SongBarLabel />} /> */}
            <VictoryBar
              data={songs.slice(0, 5)}
              x={(datum) =>
                datum.name.length > 10
                  ? `${datum.name.slice(0, 10)}...`
                  : datum.name
              }
              y="view"
              style={{
                data: { fill: colors.primary },
                labels: {
                  fontSize: 12,
                  color: colors.text,
                },
              }}
              labels={({ datum }) => datum.name}
              labelComponent={
                <VictoryTooltip
                  renderInPortal={false}
                  style={{ fontSize: 12 }}
                />
              }
              // labelComponent={<SongBarLabel />}
            />
          </VictoryChart>
        </View>
      )}

      <FlatList
        data={songs}
        renderItem={({ item, index }) => (
          <View style={styles.rank}>
            <View style={styles.viewTextRank}>
              <Text
                style={
                  index <= 2
                    ? styles.topRank
                    : [styles.numRank, { color: colors.text }]
                }
              >
                {index + 1}
              </Text>
            </View>
            <SongItem
              info={item}
              // time={item.time}
              onPressOptionModal={() => {
                setOptionModalVisible(true);
                setCurrentItem(item);
              }}
              data={songs}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <OptionModal
        options={optionSong}
        currentItem={currentItem}
        onClose={() => setOptionModalVisible(false)}
        visible={optionModalVisible}
      />
      {currentAudio && <MiniPlayer />}
    </SafeAreaView>
  );
};

export default Chart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rank: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  viewTextRank: {
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'red',
  },
  numRank: {
    marginLeft: 15,
    // marginRight: 5,
    fontSize: 20,
  },
  topRank: {
    marginLeft: 15,
    // marginRight: 2,
    fontSize: 25,
    color: color.primary,
    fontWeight: 900,
  },
});
