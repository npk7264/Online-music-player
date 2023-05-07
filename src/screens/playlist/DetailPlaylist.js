import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import BackBar from "../../components/BackBar";
import { ThemeContext } from "../../context/ThemeContext";
import { songs } from "../../../data";
import FlatListSong from "../../components/FlatListSong";
import { useNavigation } from "@react-navigation/native";

import { auth, db } from "../../services/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { PlaylistContext } from '../../context/PlaylistContext';

const DetailPlaylist = () => {
  const { colors } = useContext(ThemeContext);
  const { listSong, idPlaylist, updatePlaylist, setListSong, filterSong, renderSong, playlistData } = useContext(PlaylistContext);
  const navigation = useNavigation();


  // useEffect(() => {
  //   const getInitialData = async () => {
  //     if (Object.keys(playlistData).length > 0) {
  //       // (setListSong(playlistData.listSong));
  //       (filterSong());
  //       console.log(renderSong.length, listSong, playlistData, "context")
  //     }
  //   };
  //   getInitialData();
  // }, [playlistData]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <BackBar isSearch={true}></BackBar>
      <View style={styles.header}>
        {/* info singer */}
        <Image
          source={require("../../../assets/temp.jpg")}
          style={styles.poster} />
        <Text style={[styles.singer, { color: colors.text }]}>{playlistData?.name}</Text>
        <Text style={styles.numSong}>{playlistData?.numSong} bài hát</Text>
        {/* button */}
        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]}>
            <Ionicons name='shuffle' size={20} color='white' />
            <Text style={[styles.buttonText, { color: 'white' }]}>Shuffle</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.frame }]}>
            <Ionicons name='play-circle' size={20} color={colors.primary} />
            <Text style={[styles.buttonText, { color: colors.primary }]}>Play</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* line */}
      <View style={styles.line}></View>

      {/* add songs */}
      <View style={[styles.addSong]}>
        <Text style={{ fontSize: 20, color: colors.text }}>Bài hát</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddSong')}>
          <FontAwesome name='plus-square' size={30} color={colors.primary} />
        </TouchableOpacity>
      </View>


      {/* list song */}
      {renderSong.length > 0 &&
        <FlatListSong
          songs={renderSong}
        />}
      {console.log(renderSong.length, listSong, idPlaylist, playlistData)}
    </SafeAreaView>
  );
};

export default DetailPlaylist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },

  header: {
    // flex: 1,
    marginTop: 10,
    // justifyContent: 'center',
    alignItems: 'center'
  },
  poster: {
    width: 200,
    height: 200,
    borderRadius: 35,
  },
  singer: {
    fontSize: 28,
    fontWeight: '900',
    marginTop: 10,
    fontFamily: 'sans-serif',
  },
  numSong: {
    fontSize: 15,
    marginTop: 10,
    color: 'gray',
    fontFamily: 'sans-serif',
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    height: 45,
    width: 160,
    backgroundColor: '#ff973e',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  line: {
    borderColor: '#efefef',
    borderBottomWidth: 1,
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 25,
  },
  addSong: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
});
