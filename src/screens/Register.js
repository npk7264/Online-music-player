import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { color } from "../constants/color";

import { auth, db } from "../services/firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ThemeContext } from "../context/ThemeContext";

import { convertErrorCodeToMessage } from "../utils/helper";

const Register = () => {
  const { colors, language } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        const defaultAvatar =
          "https://firebasestorage.googleapis.com/v0/b/musicapp-80f91.appspot.com/o/avatar%2Fdefault.jpg?alt=media&token=d18fc833-4899-44fb-8094-f4e3ba861c40&_gl=1*qx3bkt*_ga*NDQ0NjU1MTI2LjE2ODQzNDA2OTM.*_ga_CW55HF8NVT*MTY4NjUzMjIxNS4zMy4xLjE2ODY1MzQwMzAuMC4wLjA.";

        // khởi tạo thông tin user
        setDoc(doc(db, "users", user.uid), {
          name: name,
          favorite: [],
          recently: [],
          avatar: defaultAvatar,
        });

        // update profile qua firebase auth
        updateProfile(user, {
          displayName: name,
          photoURL: defaultAvatar,
        });

        try {
          await AsyncStorage.setItem("email", email);
          await AsyncStorage.setItem("password", password);
          console.log("save email and password user signup");
        } catch (error) {
          console.error("Lỗi khi save email and password user signup:", error);
        }
        alert("Đăng ký tài khoản thành công!");
        navigation.replace("Login");
      })
      .catch((error) => {
        Alert.alert("Lỗi đăng ký", convertErrorCodeToMessage(error.code));
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.background,
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
          style={{ fontSize: 50, fontWeight: "bold", color: color.primary }}
        >
          mymusic
        </Text>
      </View>

      {/* Input */}
      <TextInput
        style={styles.textInput}
        placeholder={language.name}
        placeholderTextColor={"gray"}
        onChangeText={(text) => {
          setName(text);
        }}
      />
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
        placeholder={language.password}
        onChangeText={(text) => {
          setPassword(text);
        }}
        secureTextEntry={true}
      />

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (name != "" && email != "" && password != "") handleRegister();
          else Alert.alert("Lỗi đăng ký", "Bạn phải nhập đầy đủ thông tin!");
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
          {language.signUp}
        </Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 10 }}>
        {language.hasAccount}?
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#006edc", width: "70%" }]}
        onPress={() => {
          navigation.replace("Login");
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
          {language.login}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Register;

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
