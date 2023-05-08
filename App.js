import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import BottomMenu from "./src/components/BottomMenu";
import Player from "./src/screens/Player";
import Search from "./src/screens/Search";
import DetailPlaylist from "./src/screens/playlist/DetailPlaylist";
import Chart from "./src/screens/Chart";
import ArtistDetail from "./src/screens/ArtistDetail";
import AlbumDetail from "./src/components/AlbumDetail"
import AddSong from "./src/screens/playlist/AddSong";
import Favorite from "./src/screens/Favorite";
import Recent from "./src/screens/Recent";


import { AudioProvider } from "./src/context/AudioContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import { PlaylistProvider } from './src/context/PlaylistContext';
const Stack = createStackNavigator();

export default function App() {
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
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="ArtistDetail" component={ArtistDetail} />
                <Stack.Screen name="AlbumDetail" component={AlbumDetail} />
                <Stack.Screen name="DetailPlaylist" component={DetailPlaylist} />
                <Stack.Screen name="Chart" component={Chart} />
                <Stack.Screen name="Favorite" component={Favorite} />
                <Stack.Screen name="Recent" component={Recent} />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </PlaylistProvider>
      </ThemeProvider>
    </AudioProvider >
  );
}

const styles = StyleSheet.create({});
