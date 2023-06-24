import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import BottomMenu from "./src/components/BottomMenu";
import Player from "./src/screens/player/Player";
import Lyric from "./src/screens/player/Lyric";
import Search from "./src/screens/Search";
import DetailPlaylist from "./src/screens/playlist/DetailPlaylist";
import Chart from "./src/screens/Chart";
import ArtistDetail from "./src/screens/ArtistDetail";
import AlbumDetail from "./src/components/AlbumDetail";
import AddSong from "./src/screens/playlist/AddSong";
import Favorite from "./src/screens/Favorite";
import Recent from "./src/screens/Recent";
import Comment from "./src/screens/comment/Comment";
import SeeAll from "./src/screens/suggested/SeeAll";
import GenreDetail from "./src/screens/genre/GenreDetail";
import AddOneSong from "./src/screens/playlist/AddOneSong";

import { AudioProvider } from "./src/context/AudioContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import { PlaylistProvider } from "./src/context/PlaylistContext";
import { NotificationProvider } from "./src/context/NotifyContext";
import { DataProvider } from "./src/context/DataContext";

import {
  loadSinger,
  loadSongs,
  loadAlbum,
  fetchGenre,
} from "./src/utils/FirebaseHandler";

import * as SplashScreen from "expo-splash-screen";

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  // const [initScreen, setInitScreen] = useState("Login");
  const [appIsReady, setAppIsReady] = useState(false);
  const [songData, setSongData] = useState([]);
  const [singerData, setSingerData] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [lastVisibleSong, setLastVisibleSong] = useState(null);
  const [lastVisibleSinger, setLastVisibleSinger] = useState(null);
  const [lastVisibleAlbum, setLastVisibleAlbum] = useState(null);

  useEffect(() => {
    async function prepare() {
      try {
        const [data, lastVisible] = await loadSongs(
          songData,
          10,
          lastVisibleSong
        );
        setSongData(data);
        setLastVisibleSong(lastVisible);

        const [data2, lastVisible2] = await loadSinger(
          singerData,
          6,
          lastVisibleSinger
        );
        setSingerData(data2);
        setLastVisibleSinger(lastVisible2);

        const [data3, lastVisible3] = await loadAlbum(
          albumData,
          6,
          lastVisibleAlbum
        );
        setLastVisibleAlbum(lastVisible3);
        setAlbumData(data3);

        const genre = await fetchGenre();
        setGenreData(genre);
      } catch (e) {
        console.warn("prepare data", e);
      } finally {
        // Tell the application to render
        console.log("set app is ready true");
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <DataProvider
      songData={songData}
      albumData={albumData}
      singerData={singerData}
      genreData={genreData}
      lastSong={lastVisibleSong}
      lastSinger={lastVisibleSinger}
      lastAlbum={lastVisibleAlbum}
    >
      {/* {console.log(songData)} */}
      <ThemeProvider>
        <PlaylistProvider>
          <NotificationProvider>
            <AudioProvider>
              <SafeAreaProvider onLayout={onLayoutRootView}>
                <StatusBar hidden={true} />
                <NavigationContainer>
                  <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{ headerShown: false }}
                  >
                    <Stack.Screen name="AddOneSong" component={AddOneSong} />
                    <Stack.Screen name="GenreDetail" component={GenreDetail} />
                    <Stack.Screen name="SeeAll" component={SeeAll} />
                    <Stack.Screen name="AddSong" component={AddSong} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="BottomMenu" component={BottomMenu} />
                    <Stack.Screen name="Player" component={Player} />
                    <Stack.Screen name="Lyric" component={Lyric} />
                    <Stack.Screen name="Search" component={Search} />
                    <Stack.Screen
                      name="ArtistDetail"
                      component={ArtistDetail}
                    />
                    <Stack.Screen name="AlbumDetail" component={AlbumDetail} />
                    <Stack.Screen name="Comment" component={Comment} />
                    <Stack.Screen
                      name="DetailPlaylist"
                      component={DetailPlaylist}
                    />
                    <Stack.Screen name="Chart" component={Chart} />
                    <Stack.Screen name="Favorite" component={Favorite} />
                    <Stack.Screen name="Recent" component={Recent} />
                  </Stack.Navigator>
                </NavigationContainer>
              </SafeAreaProvider>
            </AudioProvider>
          </NotificationProvider>
        </PlaylistProvider>
      </ThemeProvider>
    </DataProvider>
  );
}

const styles = StyleSheet.create({});
