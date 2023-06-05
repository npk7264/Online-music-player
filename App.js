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

import { AudioProvider } from "./src/context/AudioContext";
import { ThemeProvider } from "./src/context/ThemeContext";
import { PlaylistProvider } from "./src/context/PlaylistContext";

import { fetchSongs, fetchAllAlbum, fetchAllArtist } from "./src/utils/FirebaseHandler";

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';

import { auth, db } from "./src/services/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit
} from "firebase/firestore";


const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();


export default function App() {
  const [initScreen, setInitScreen] = useState("Login");
  const [appIsReady, setAppIsReady] = useState(false);
  const [songData, setSongData] = useState([]);
  const [singerData, setSingerData] = useState([]);
  const [albumData, setAlbumData] = useState([]);


  const checkSong = async () => {
    try {
      //goi listSong từ AsyncStorage
      const data = await AsyncStorage.getItem('listSong');
      const listSong = data ? JSON.parse(data) : null;

      //tạo mảng các id songs từ firestore
      const querySnapshot = await getDocs(collection(db, "songs"));
      const songIds = querySnapshot.docs.map((doc) => doc.id);

      //nếu mảng id song gọi từ firestore có thay đổi so với dữ liệu từ storage thì nạp lại data
      const isContained = listSong !== null ? listSong.every(obj => songIds.includes(obj.id)) : false;
      // console.log(listSong)
      if (songIds.length !== listSong?.length || !isContained) {
        const data = await fetchSongs();
        setSongData(data);
        //lưu dữ liệu từ firestore vào AsyncStorage
        await AsyncStorage.setItem('listSong', JSON.stringify(data));
      }
      else
        setSongData(listSong)
      console.log('checkSong')
    } catch (error) {
      console.error('checkSong:', error);
    }
  }

  const checkSinger = async () => {
    try {
      //goi listSinger từ AsyncStorage
      const data = await AsyncStorage.getItem('listSinger');
      const listSinger = data ? JSON.parse(data) : null;

      //tạo mảng các id singer từ firestore
      const querySnapshot = await getDocs(collection(db, "artists"));
      const singerIds = querySnapshot.docs.map((doc) => doc.id);

      //nếu mảng id song gọi từ firestore có thay đổi so với dữ liệu từ storage thì nạp lại data
      const isContained = listSinger !== null ? listSinger.every(obj => singerIds.includes(obj.id)) : false;
      if (singerIds.length !== listSinger?.length || !isContained) {
        const data = await fetchAllArtist();
        setSingerData(data);
        // console.log(data);
        //lưu dữ liệu từ firestore vào AsyncStorage
        await AsyncStorage.setItem('listSinger', JSON.stringify(data));
      }
      else
        setSingerData(listSinger);
      console.log('checkSinger');
    } catch (error) {
      console.error('checkSinger:', error);
    }
  }

  const checkAlbum = async () => {
    try {
      //goi listAlbum từ AsyncStorage
      const data = await AsyncStorage.getItem('listAlbum');
      const listAlbum = data ? JSON.parse(data) : null;

      //tạo mảng các id album từ firestore
      const querySnapshot = await getDocs(collection(db, "albums"));
      const albumIds = querySnapshot.docs.map((doc) => doc.id);

      //nếu mảng id song gọi từ firestore có thay đổi so với dữ liệu từ storage thì nạp lại data
      const isContained = listAlbum !== null ? listAlbum.every(obj => albumIds.includes(obj.id)) : false;
      if (albumIds.length !== listAlbum?.length || !isContained) {
        const data = await fetchAllAlbum();
        setAlbumData(data);
        //lưu dữ liệu từ firestore vào AsyncStorage
        await AsyncStorage.setItem('listAlbum', JSON.stringify(data));
      }
      else
        setAlbumData(listAlbum);
      console.log('checkAlbum');
    } catch (error) {
      console.error('checkAlbum:', error);
    }
  }


  useEffect(() => {
    async function prepare() {
      try {
        await checkSong();
        await checkSinger();
        await checkAlbum();

      } catch (e) {
        console.warn('prepare data', e);
      } finally {
        // Tell the application to render
        console.log('set app is ready true')
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

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


  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <AudioProvider songData={songData} albumData={albumData} singerData={singerData} >
      {/* {console.log(songData)} */}
      <ThemeProvider>
        <PlaylistProvider>
          <SafeAreaProvider onLayout={onLayoutRootView}>
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
        </PlaylistProvider>
      </ThemeProvider>
    </AudioProvider >
  );
}

const styles = StyleSheet.create({});
