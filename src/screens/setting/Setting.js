import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Switch,
  TouchableOpacity,
  Image,
  Alert,
  Button,
  Modal,
  TextInput,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { auth, db, storage } from "../../services/firebaseConfig";
import { updatePassword } from "firebase/auth";
import { signOut, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";

import SearchBar from "../../components/SearchBar";
import MiniPlayer from "../../components/MiniPlayer";

import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { AudioContext } from "../../context/AudioContext";
import { ThemeContext } from "../../context/ThemeContext";
import { PlaylistContext } from "../../context/PlaylistContext";
import { NotificationContext } from "../../context/NotifyContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { selectSong, pause } from "../../utils/AudioController";
import ChangePassword from "./ChangePassword";
import ChangeUsername from "./ChangeUsername";
import SetTime from "./SetTime";

const SECTIONS = [
  {
    header: "accountInformation",
    items: [
      {
        id: "changeNickName",
        icon: "person-circle-outline",
        label: "Đổi tên hiển thị",
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
    header: "control",
    items: [
      {
        id: "language",
        icon: "trail-sign-outline",
        label: "Ngôn ngữ",
        type: "toggle",
      },
      {
        id: "darkMode",
        icon: "sunny-outline",
        label: "Dark mode",
        type: "toggle",
      },
      {
        id: "timer",
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
      // {
      //   id: "exit",
      //   icon: "md-phone-portrait-outline",
      //   label: "Thoát",
      //   type: "button",
      // },
    ],
  },
];

const Setting = () => {
  const { colors, darkMode, toggleTheme, language, toggleLanguage, checkLanguage } = useContext(ThemeContext);
  const context = useContext(AudioContext);
  const {
    userId,
    soundObj,
    currentAudio,
    playbackObj,
    isPlaying,
    updateState,
  } = context;

  const contextPlaylist = useContext(PlaylistContext);
  const contextNotify = useContext(NotificationContext);

  const navigation = useNavigation();
  const [username, setUsername] = useState(auth.currentUser?.displayName);
  const [avatar, setAvatar] = useState(auth.currentUser?.photoURL);
  const [modalVisible, setModalVisible] = useState(false);
  const [changeNameVisible, setChangeNameVisible] = useState(false);
  const [OffTimeVisible, setOffTimeVisible] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.5,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const avtref = ref(
        storage,
        `avatar/${uri.substring(uri.lastIndexOf("/") + 1)}`
      );

      const img = await fetch(uri);
      const bytes = await img.blob();

      try {
        const snapshot = await uploadBytes(avtref, bytes);
        const url = await getDownloadURL(snapshot.ref);
        setAvatar(url);
        await updateProfile(auth.currentUser, {
          photoURL: url,
        });

        const userRef = doc(db, "users/" + auth.currentUser.uid);
        await updateDoc(userRef, {
          avatar: url,
        });
        console.log(`Upload and update avatar successfully!`);
      } catch (error) {
        console.error(
          `Error occurred while uploading or updating avatar: ${error}`
        );
      }
    }
  };

  const dangxuat = () => {
    signOut(auth)
      .then(async () => {
        if (isPlaying)
          await selectSong(
            context,
            currentAudio,
            [currentAudio],
            contextPlaylist,
            contextNotify
          );
        try {
          await AsyncStorage.removeItem("email");
          await AsyncStorage.removeItem("password");
          console.log("setup email and password = null log out");
        } catch (error) {
          console.error(
            "Lỗi khi setup email and password user log out: ",
            error
          );
        }
        navigation.replace("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePressOption = (id) => {
    if (id == "changeNickName") setChangeNameVisible(true);
    if (id == "logOut") dangxuat();
    if (id == "darkMode") toggleTheme();
    if (id == "changePassword") setModalVisible(true);
    if (id == "timer") setOffTimeVisible(true);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar></StatusBar>
      <SearchBar title={language["setting"]} />

      <ScrollView>
        <View style={styles.userInfoSection}>
          {/* <Avatar.Icon size={80} icon="account" /> */}
          <Text style={[styles.userName, { color: colors.text }]}>
            {username}
          </Text>
          <TouchableOpacity
            onPress={async () => {
              await pickImage();
            }}
          >
            <Image source={{ uri: avatar }} style={styles.avatar} />
          </TouchableOpacity>
        </View>
        {SECTIONS.map(({ header, items }) => {
          return (
            <View style={styles.section} key={header}>
              <Text style={styles.sectionHeader}>{language[header]}</Text>
              {items.map(({ id, label, icon, type }) => {
                return (
                  <TouchableOpacity
                    key={id}
                    onPress={() => handlePressOption(id)}
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
                        {language[id]}
                      </Text>

                      <View style={styles.rowSpacer} />

                      {type === "toggle" && id === "darkMode" && (
                        <Switch
                          trackColor={{ false: "#767577", true: "#767577" }}
                          thumbColor={darkMode ? colors.primary : "#f4f3f4"}
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={toggleTheme}
                          value={darkMode}
                        />
                      )}

                      {type === "toggle" && id === "language" && (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image source={checkLanguage === "en" ? require('../../../assets/USA.png') : require('../../../assets/vietNam.png')}
                            style={{ width: 40, height: 30, marginRight: 10 }} />
                          <Switch
                            trackColor={{ false: "red", true: "red" }}
                            thumbColor={"#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleLanguage}
                            value={checkLanguage === "en"}
                          />
                        </View>
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
        <View style={{ flex: 1 }}>
          {/* modal add new playlist */}
          <ChangePassword
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        </View>
        <View style={{ flex: 1 }}>
          {/* modal add new playlist */}
          <ChangeUsername
            visible={changeNameVisible}
            onClose={() => setChangeNameVisible(false)}
            setUsername={setUsername}
          />
        </View>
        {
          OffTimeVisible &&
          <View style={{ flex: 1 }}>
            <SetTime
              visible={OffTimeVisible}
              onClose={() => setOffTimeVisible(false)}
            />
          </View>
        }
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
    fontWeight: 500,
    marginTop: 5,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#e9edf0",
    marginVertical: 10,
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
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginHorizontal: 40,
    marginVertical: 10,
    marginBottom: 10,
  },
  button: {
    width: 170,
    height: 45,
    marginVertical: 15,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    // padding: 10
  },
});
