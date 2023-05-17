import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { auth } from "./src/services/firebaseConfig";

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

import { AudioProvider } from "./src/context/AudioContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import { PlaylistProvider } from "./src/context/PlaylistContext";
const Stack = createStackNavigator();

export default function App() {
  const [initScreen, setInitScreen] = useState("Login");

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setInitScreen("BottomMenu");
  //       console.log(true);
  //     } else {
  //       setInitScreen("Login");
  //       console.log(false);
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

  return (
    <AudioProvider>
      <ThemeProvider>
        <PlaylistProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen name="AddSong" component={AddSong} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="BottomMenu" component={BottomMenu} />
                <Stack.Screen name="Player" component={Player} />
                <Stack.Screen name="Lyric" component={Lyric} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="ArtistDetail" component={ArtistDetail} />
                <Stack.Screen name="AlbumDetail" component={AlbumDetail} />
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
        </PlaylistProvider>
      </ThemeProvider>
    </AudioProvider>
  );
}

const styles = StyleSheet.create({});
