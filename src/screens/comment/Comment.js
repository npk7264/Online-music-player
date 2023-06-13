import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import BackBar from "../../components/BackBar";
import { ThemeContext } from "../../context/ThemeContext";
import { AudioContext } from "../../context/AudioContext";
import CommentItem from "./CommentItem";

import { auth, db } from "../../services/firebaseConfig";
import {
  doc,
  addDoc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

const Comment = () => {
  const { colors } = useContext(ThemeContext);
  const { currentAudio, userId } = useContext(AudioContext);

  const [loaded, setLoaded] = useState(false);
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [flag, setFlag] = useState(false);

  async function addComment(newComment) {
    const songRef = doc(db, "songs/" + currentAudio.id);
    const commentsRef = collection(songRef, "comments");
    try {
      const docRef = await addDoc(commentsRef, {
        userId: userId,
        content: newComment,
        created_at: serverTimestamp(),
      });

      console.log("Comment đã được thêm thành công với ID: ", docRef.id);
    } catch (error) {
      console.error("Lỗi khi thêm comment: ", error);
    }
  }

  async function getComments() {
    setLoaded(false);
    setList([]);
    const songRef = doc(db, "songs/" + currentAudio.id);
    const commentsRef = collection(songRef, "comments");
    const q = query(commentsRef, orderBy("created_at", "desc"));

    try {
      const querySnapshot = await getDocs(q);

      const comments = await Promise.all(
        querySnapshot.docs.map(async (comment_doc) => {
          const commentData = comment_doc.data();
          const userRef = doc(db, `users/${commentData.userId}`);
          const userSnapshot = await getDoc(userRef);

          return {
            id: comment_doc.id,
            content: commentData.content,
            createdAt: commentData.created_at,
            user: {
              id: userSnapshot.id,
              name: userSnapshot.data().name,
              avatar: userSnapshot.data().avatar,
            },
          };
        })
      );

      setList(comments);
      setLoaded(true);
    } catch (error) {
      console.log("Error getting comments: ", error);
    }
  }

  useEffect(() => {
    getComments();
  }, [flag, currentAudio]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar></StatusBar>
      <BackBar />
      {!loaded && <ActivityIndicator size="large" color={colors.primary} />}
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <CommentItem
            userName={item.user.name}
            content={item.content}
            avatar={item.user.avatar}
          />
        )}
        keyExtractor={(item, index) => index}
      />
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 20,
          marginBottom: 10,
          marginTop: 20,
        }}
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
          value={input}
          placeholder="Bình luận của bạn"
          placeholderTextColor={colors.text}
          numberOfLines={1}
          onChangeText={(text) => setInput(text)}
        />
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            paddingHorizontal: 15,
            marginLeft: 10,
            borderRadius: 15,
            justifyContent: "center",
          }}
          onPress={() => {
            addComment(input);
            setInput("");
            setFlag(!flag);
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
