import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AudioContext } from "../context/AudioContext";
import { color } from "../constants/color";

import { auth, db } from "../services/firebaseConfig";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { fetchRecentestSong, fetchSongListFromGenreStatistics, fetchDataArtistFollowedByUser, fetchUser, getRecent } from "../utils/FirebaseHandler";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataContext } from "../context/DataContext";
import { PlaylistContext } from "../context/PlaylistContext";

const Login = () => {
  const context = useContext(AudioContext);
  const { setFavoriteID, setRecentID, setRecentData } = useContext(PlaylistContext);
  const { setSuggestData, listSong, setListIDArtistFollowing, setArtistFollowing } = useContext(DataContext);
  const { updateState } = context;
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loaded, setLoaded] = useState(false);

  //fetch list song suggest for screen home
  const setSuggestDataForScreenHone = async (userId) => {
    const data = await (fetchSongListFromGenreStatistics(userId, 6));
    setSuggestData(data ? data : listSong);
  }
  //fetch list artist following by user
  const fetchArtistFollowingAndFavoriteIDAndRecentIDByUser = async (userId) => {
    const userData = await fetchUser(userId);
    const infoArtist = await fetchDataArtistFollowedByUser(userData.follow);
    const recentData = await getRecent(userId);
    setArtistFollowing(infoArtist);
    setListIDArtistFollowing(userData.follow);
    setFavoriteID(userData.favorite);
    setRecentID(userData.recently);
    setRecentData(recentData);
  }


  const LoginFirebase = (auth, email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        try {
          await AsyncStorage.setItem("email", email);
          await AsyncStorage.setItem("password", password);
          console.log("save email and password user login");
        } catch (error) {
          console.error("Lỗi khi save email and password user login:", error);
        }
        // fetch data
        const promiseFunction = [fetchRecentestSong(user.uid, context), setSuggestDataForScreenHone(user.uid), fetchArtistFollowingAndFavoriteIDAndRecentIDByUser(user.uid)]
        await Promise.all(promiseFunction);
        navigation.replace("BottomMenu");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  const handleLogin = () => {
    LoginFirebase(auth, email, password);
  };

  const forgotPasswrod = (email) => {
    if (email !== "") {
      sendPasswordResetEmail(auth, email);
      alert("Kiểm tra email và đặt lại mật khẩu");
    } else alert("Vui lòng nhập email!");
  };

  useEffect(() => {
    updateState(context, {
      currentAudio: null,
      currentAudioIndex: null,
      isPlaying: false,
      isLooping: false,
      playbackPosition: null,
      playbackDuration: null,
    });
    const signInAuto = async () => {
      try {
        const mail = await AsyncStorage.getItem("email");
        const pass = await AsyncStorage.getItem("password");
        if (mail !== null && pass !== null) {
          LoginFirebase(auth, mail, pass);
          console.log("auto login complete");
        } else setLoaded(true);
      } catch (error) {
        console.error("Lỗi khi signInAuto:", error);
      }
    };
    signInAuto();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          height: "30%",
          paddingVertical: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{ fontSize: 40, fontWeight: "bold", color: color.primary }}
        >
          mymusic
        </Text>
      </View>

      {!loaded && <ActivityIndicator size="large" color="#ff8216" />}

      {loaded && (
        <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
          {/* Input */}
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor={"gray"}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <TextInput
            style={[styles.textInput, { marginBottom: 20 }]}
            placeholderTextColor={"gray"}
            placeholder="Mật khẩu"
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry={true}
          />

          {/* Button */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
              Đăng nhập
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              marginBottom: 20,
              padding: 5,
            }}
            onPress={() => forgotPasswrod(email)}
          >
            Quên mật khẩu?
          </Text>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "#006edc", width: "70%" },
            ]}
            onPress={() => {
              navigation.replace("Register");
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
              Tạo tài khoản mới
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  fields: { width: 70, fontSize: 16, fontWeight: "500" },
  textInput: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "gray",
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  button: {
    width: "90%",
    height: 50,
    borderRadius: 15,
    backgroundColor: color.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
});
