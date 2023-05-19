import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import BackBar from "../../components/BackBar";
import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";
import CommentItem from "./CommentItem";

import { auth, db } from "../../services/firebaseConfig";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
} from "firebase/firestore";
const Comment = () => {
  const { colors } = useContext(ThemeContext);
  const { currentAudio } = useContext(AudioContext);

  const [list, setList] = useState([]);

  async function getComments() {
    const songRef = doc(db, "songs/" + currentAudio.id);
    const commentsRef = collection(songRef, "comments");
    const q = query(commentsRef, orderBy("created_at", "desc"));

    try {
      const querySnapshot = await getDocs(q);
      const comments = [];

      for (const comment_doc of querySnapshot.docs) {
        const commentData = comment_doc.data();
        const userRef = doc(db, "users/" + "5zrQaIdHLgZ4EjlgEPYLxN6zzlH2");
        const userSnapshot = await getDoc(userRef);

        const comment = {
          id: comment_doc.id,
          content: commentData.content,
          createdAt: commentData.created_at,
          user: {
            id: userSnapshot.id,
            name: userSnapshot.data().name,
          },
        };

        comments.push(comment);
      }
      setList(comments);
    } catch (error) {
      console.log("Error getting comments: ", error);
    }
  }

  useEffect(() => {
    getComments();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar></StatusBar>
      <BackBar />
      <FlatList
        data={list}
        renderItem={({ item }) => <CommentItem userName={item.user.name} content={item.content} />}
        keyExtractor={(item, index) => index}
      />

      <View
        style={{ flexDirection: "row", marginHorizontal: 20, marginBottom: 10 }}
      >
        <TextInput
          style={{
            flex: 1,
            height: 50,
            backgroundColor: colors.frame,
            fontSize: 18,
            paddingHorizontal: 10,
            borderRadius: 15,
            color: colors.text,
          }}
          placeholder="Bình luận của bạn"
          numberOfLines={1}
        />
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: 15,
            marginLeft: 10,
            borderRadius: 15,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
            Đăng
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({});
