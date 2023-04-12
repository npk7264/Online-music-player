import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Title = ({ title }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/Music_logo_mobile.png")}
                style={{ width: 40, height: 40 }}
            />
            <Text style={styles.title} numberOfLines={1}>
                {title}
            </Text>
        </View>
    );
};

export default Title;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        justifyContent: "center",
        paddingHorizontal: 20,
        flexDirection: "row",
    },
    title: {
        paddingLeft: 10,
        fontSize: 27,
        fontWeight: "500"
    },

});