import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { color } from "../constants/color";

import { auth, db } from "../services/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), {
          name: name,
          favorite: [],
          recently: [],
        });
        alert("Đăng ký tài khoản thành công!");
        navigation.replace("Login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  useEffect(() => {}, []);

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
        placeholder="Tên"
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
        placeholder="Mật khẩu"
        onChangeText={(text) => {
          setPassword(text);
        }}
        secureTextEntry={true}
      />

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
          Đăng ký
        </Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 16, fontWeight: "500", marginBottom: 10 }}>
        Bạn đã có tài khoản?
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#006edc", width: "70%" }]}
      >
        <Text
          style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
          onPress={() => {
            navigation.replace("Login");
          }}
        >
          Đăng nhập
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
