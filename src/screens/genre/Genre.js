import { StyleSheet, View, FlatList, Text } from "react-native";
import React, { useState, useContext } from "react";
import GenreItem from "./GenreItem";
import OptionModal from "../../components/OptionModal";
import { ThemeContext } from "../../context/ThemeContext";
import { DataContext } from "../../context/DataContext";
import { optionSinger } from "../../utils/optionModal"
import MoreData from "../../components/MoreData";

const Genre = () => {
    const { colors } = useContext(ThemeContext);
    const { listGenre } = useContext(DataContext);
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>

            <FlatList
                data={listGenre}
                renderItem={({ item }) => (
                    <GenreItem
                        id={item.id}
                        name={item.name}
                        image={item.image}
                    />
                )}
                horizontal={false}
                numColumns={2}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

export default Genre;

const styles = StyleSheet.create({})