import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Modal,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { db, auth } from "../../services/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { updatePassword } from "@firebase/auth";
import { AudioContext } from "../../context/AudioContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangePassword = ({ visible, onClose }) => {
  const { colors, darkMode, language, checkLanguage } = useContext(ThemeContext);
  const [isFocused, setIsFocused] = useState(false); // focus TextInput

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  //check keyboard visible
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleChangePassword = async () => {
    await changePassword();
    onClose();
  };

  const changePassword = async () => {
    try {
      const dataPassword = await AsyncStorage.getItem("password");
      const user = auth.currentUser;

      if (dataPassword === currentPassword) {
        updatePassword(user, newPassword)
          .then(async () => {
            // Update successful.
            await AsyncStorage.setItem("password", newPassword);
            Alert.alert(checkLanguage === "en" ? "Complete" : "Thành công", checkLanguage === "en" ? "Change password successfully" : "Bạn đã đổi mật khẩu thành công");
          })
          .catch((error) => {
            // An error ocurred
            // ...
            Alert.alert("197 setting", error);
          });
      } else checkLanguage === "en" ? Alert.alert("Fail", "wrong password") : Alert.alert("Thất bại", "Bạn nhập sai mật khẩu");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <Modal
        animationType="slide"
        transparent
        visible={visible}
        statusBarTranslucent
      >
        <View
          style={[
            styles.modal,
            {
              backgroundColor: colors.modal,
              bottom: isKeyboardVisible ? 250 : 0,
            },
          ]}
        >
          {/* info */}
          <View style={styles.header}>
            <Text
              style={[styles.title, { color: colors.text }]}
              numberOfLines={1}
            >
              {checkLanguage === "en" ? "New Password" : "Đặt mật khẩu mới"}
            </Text>
          </View>
          <TextInput
            style={[
              styles.textInput,
              {
                borderColor: isFocused ? "#ff8216" : null,
                backgroundColor: isFocused
                  ? darkMode
                    ? "#2a221f"
                    : "#fff5ed"
                  : darkMode
                    ? "#2C3333"
                    : "#f5f5f6",
                borderWidth: isFocused ? 1 : 0,
                color: colors.text,
              },
            ]}
            placeholder={checkLanguage === "en" ? "Current Password" : "Mật khẩu hiện tại"}
            placeholderTextColor={"gray"}
            autoFocus={true}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={(text) => setCurrentPassword(text)}
            secureTextEntry={true}
          />
          <TextInput
            style={[
              styles.textInput,
              {
                borderColor: !isFocused ? "#ff8216" : null,
                backgroundColor: !isFocused
                  ? darkMode
                    ? "#2a221f"
                    : "#fff5ed"
                  : darkMode
                    ? "#2C3333"
                    : "#f5f5f6",
                borderWidth: !isFocused ? 1 : 0,
                color: colors.text,
              },
            ]}
            placeholder={checkLanguage === "en" ? "New Password" : "Mật khẩu mới"}
            placeholderTextColor={"gray"}
            autoFocus={false}
            onFocus={() => setIsFocused(false)}
            onBlur={() => setIsFocused(true)}
            onChangeText={(text) => setNewPassword(text)}
            secureTextEntry={true}
          />

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.frame }]}
              onPress={onClose}
            >
              <Text
                style={{ color: colors.primary, fontSize: 18, fontWeight: 500 }}
              >
                {language?.cancel}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.primary }]}
              onPress={() => {
                handleChangePassword();
              }}
            >
              <Text style={{ color: "white", fontSize: 18, fontWeight: 500 }}>
                {language?.update}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBg} />
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1000,
    height: 300,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#efefef",
    borderBottomWidth: 1,
  },
  textInput: {
    height: 50,
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 15,
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    padding: 20,
    paddingBottom: 20,
    color: "black",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 80,
    marginTop: 10,
  },
  button: {
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  modalBg: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
});

export default ChangePassword;
