import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { auth, db } from "../../services/firebaseConfig";
import { signOut } from "firebase/auth";

import { fetchUser } from "../../utils/FirebaseHandler";
import { selectSong, pause } from "../../utils/AudioController";

import SearchBar from "../../components/SearchBar";
import MiniPlayer from "../../components/MiniPlayer";
// import { Avatar } from 'react-native-paper';
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { AudioContext } from "../../context/AudioContext";
import { ThemeContext } from "../../context/ThemeContext";

import AsyncStorage from '@react-native-async-storage/async-storage';

const SECTIONS = [
  {
    header: "Profile",
    items: [
      {
        id: "changeName",
        icon: "person-circle-outline",
        label: "Đổi nick name",
        type: "modal",
      },
      {
        id: "changePassword",
        icon: "key-outline",
        label: "Đổi mật khẩu",
        type: "modal",
      },
    ],
  },
  {
    header: "Preferences",
    items: [
      {
        id: "notification",
        icon: "md-notifications-outline",
        label: "Thông báo",
        type: "link",
      },
      {
        id: "language",
        icon: "trail-sign-outline",
        label: "Ngôn ngữ",
        type: "link",
      },
      {
        id: "darkMode",
        icon: "sunny-outline",
        label: "Dark mode",
        type: "toggle",
      },
      {
        id: "time",
        icon: "timer-outline",
        label: "Hẹn giờ",
        type: "link",
      },
    ],
  },
  {
    header: "App",
    items: [
      {
        id: "logOut",
        icon: "log-out-outline",
        label: "Đăng xuất",
        type: "button",
      },
      {
        id: "quit",
        icon: "md-phone-portrait-outline",
        label: "Thoát",
        type: "button",
      },
    ],
  },
];

const Setting = () => {
  const { colors, darkMode, toggleTheme } = useContext(ThemeContext);
  const context = useContext(AudioContext);
  const {
    userId,
    soundObj,
    currentAudio,
    playbackObj,
    isPlaying,
    updateState,
  } = context;
  const [userName, setUserName] = useState(null);
  const navigation = useNavigation();

  // useEffect(async () => {
  //   await fetchUser(userId, setUserName);
  // }, []);

  const dangxuat = () => {
    signOut(auth)
      .then(async () => {
        if (isPlaying) selectSong(context, currentAudio);
        updateState(context, {
          currentAudio: null,
          currentAudioIndex: null,
          isPlaying: false,
          isLooping: false,
          playbackPosition: null,
          playbackDuration: null,
        });
        try {
          await AsyncStorage.removeItem('email');
          await AsyncStorage.removeItem('password');
          console.log('setup email and password = null log out');
        } catch (error) {
          console.error('Lỗi khi setup email and password user log out: ', error);
        }
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar></StatusBar>
      <SearchBar title={"Cài đặt"} />

      <ScrollView>
        <View style={styles.userInfoSection}>
          {/* <Avatar.Icon size={80} icon="account" /> */}
          <Text style={[styles.userName, { color: colors.text }]}>
            User
          </Text>
        </View>

        {SECTIONS.map(({ header, items }) => {
          return (
            <View style={styles.section} key={header}>
              <Text style={styles.sectionHeader}>{header}</Text>
              {items.map(({ id, label, icon, type }) => {
                return (
                  <TouchableOpacity
                    key={id}
                    onPress={() => {
                      id == "logOut" ? dangxuat() : alert(id);
                      id == "darkMode" ? toggleTheme() : alert(id)
                    }}
                  >
                    <View
                      style={[
                        styles.row,
                        { backgroundColor: darkMode ? "#1f222a" : "#f2f2f2" },
                      ]}
                    >
                      <View style={styles.rowIcon}>
                        <Ionicons
                          color={darkMode ? "white" : "black"}
                          name={type === "toggle" && darkMode ? "moon" : icon}
                          size={25}
                        />
                      </View>

                      <Text style={[styles.rowLabel, { color: colors.text }]}>
                        {label}
                      </Text>

                      <View style={styles.rowSpacer} />

                      {type === "toggle" && (
                        <Switch
                          trackColor={{ false: "#767577", true: "#767577" }}
                          thumbColor={darkMode ? colors.primary : "#f4f3f4"}
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={toggleTheme}
                          value={darkMode}
                        />
                      )}

                      {(type === "link" || type === "modal") && (
                        <FontAwesome5
                          color={darkMode ? "white" : "black"}
                          name="chevron-right"
                          size={22}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
      {currentAudio && <MiniPlayer />}
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  userInfoSection: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: 30,
    marginTop: 5,
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionHeader: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: "600",
    color: "#9e9e9e",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontSize: 17,
    color: "black",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
