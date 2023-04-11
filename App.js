import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import BottomMenu from "./src/components/BottomMenu";
import Player from "./src/screens/Player";
import Search from "./src/screens/Search";
import DetailPlaylist from "./src/screens/DetailPlaylist";
import Chart from "./src/screens/Chart";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="BottomMenu"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="BottomMenu" component={BottomMenu} />
          <Stack.Screen name="Player" component={Player} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="DetailPlaylist" component={DetailPlaylist} />
          <Stack.Screen name="Chart" component={Chart} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
