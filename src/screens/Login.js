import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AudioContext } from "../context/AudioContext";
import { color } from "../constants/color";

import { auth, db } from "../services/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { fetchRecentestSong } from "../utils/FirebaseHandler";

import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const context = useContext(AudioContext);
  const { updateState } = context;
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginFirebase = (auth, email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {

        const user = userCredential.user;
        try {
          await AsyncStorage.setItem('email', email);
          await AsyncStorage.setItem('password', password);
          console.log('save email and password user login');
        } catch (error) {
          console.error('Lỗi khi save email and password user login:', error);
        }
        fetchRecentestSong(user.uid, context);
        navigation.replace("BottomMenu");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  const handleLogin = () => {
    LoginFirebase(auth, email, password);
  };

  useEffect(() => {
    // const unsubscribe = auth.onAuthStateChanged((user) => {
    //   if (user) {
    //     fetchRecentestSong(user.uid, context);
    //     navigation.replace("BottomMenu");
    //   }
    // });
    // return unsubscribe;
    const signInAuto = async () => {
      try {
        const mail = await AsyncStorage.getItem('email');
        const pass = await AsyncStorage.getItem('password');
        if (mail !== null && pass !== null) {
          LoginFirebase(auth, mail, pass);
          console.log('auto login complete');
        }
      } catch (error) {
        console.error('Lỗi khi signInAuto:', error);
      }
    }
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
      <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 10 }}>
        Bạn chưa có tài khoản?
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#006edc", width: "70%" }]}
        onPress={() => {
          navigation.replace("Register");
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
          Tạo tài khoản mới
        </Text>
      </TouchableOpacity>
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
    marginBottom: 30,
  },
});
