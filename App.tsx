import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import MainPage from "./src/pages/Main";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <MainPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
