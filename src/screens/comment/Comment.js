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
import { color } from "../../constants/color";

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
  deleteDoc,
} from "firebase/firestore";

const Comment = () => {
  const { colors, language } = useContext(ThemeContext);
  const { currentAudio, userId } = useContext(AudioContext);

  const [loaded, setLoaded] = useState(false);
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");
  const [flag, setFlag] = useState(false);
  const [searchType, setSearchType] = useState(0);

  async function addComment(newComment) {
    const songRef = doc(db, "songs/" + currentAudio.id);
    const commentsRef = collection(songRef, "comments");
    try {
      const docRef = await addDoc(commentsRef, {
        userId: userId,
        content: newComment,
        created_at: serverTimestamp(),
      });

      // console.log("Comment đã được thêm thành công với ID: ", docRef.id);
    } catch (error) {
      console.error("Lỗi khi thêm comment: ", error);
    }
  }

  async function getComments() {
    setLoaded(false);
    setList([]);
    const songRef = doc(db, "songs/" + currentAudio.id);
    const commentsRef = collection(songRef, "comments");
    const q = query(
      commentsRef,
      orderBy("created_at", searchType == 0 ? "desc" : "asc")
    );

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

  async function deleteComment(commentId) {
    setList(list.filter((item) => item.id != commentId));
    try {
      const songRef = doc(db, "songs/" + currentAudio.id);
      const commentRef = doc(collection(songRef, "comments"), commentId);
      await deleteDoc(commentRef);
      console.log("ok");
    } catch (error) {
      console.log("Fail to delete comment: ", error);
    }
  }

  useEffect(() => {
    getComments();
  }, [flag, currentAudio, searchType]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar></StatusBar>
      <BackBar />
      {!loaded && <ActivityIndicator size="large" color={colors.primary} />}

      {loaded && (
        <View style={[styles.searchType]}>
          <View
            style={{
              // height: 36,
              // width: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={[styles.textType, { fontWeight: "bold" }]}>
              Sắp xếp
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.searchTypeItem,
              {
                backgroundColor:
                  searchType === 0 ? colors.primary : colors.background,
              },
            ]}
            onPress={() => {
              setSearchType(0);
            }}
          >
            <Text
              style={[
                styles.textType,
                { color: searchType === 0 ? "white" : colors.primary },
              ]}
            >
              Mới nhất
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.searchTypeItem,
              {
                backgroundColor:
                  searchType === 1 ? colors.primary : colors.background,
              },
            ]}
            onPress={() => {
              setSearchType(1);
            }}
          >
            <Text
              style={[
                styles.textType,
                { color: searchType === 1 ? "white" : colors.primary },
              ]}
            >
              Cũ nhất
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={list}
        renderItem={({ item }) => (
          <CommentItem
            id={item.id}
            user={item.user}
            content={item.content}
            avatar={item.user.avatar}
            time={item.createdAt}
            deleteComment={deleteComment}
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
          placeholder={language.yourComment}
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
            {language.post}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Comment;

const styles = StyleSheet.create({
  searchType: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  searchTypeItem: {
    borderColor: color.primary,
    borderWidth: 2,
    borderRadius: 15,
    height: 36,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  textType: {
    fontSize: 15,
    fontWeight: 500,
  },
});
