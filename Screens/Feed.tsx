import { View, SafeAreaView, StyleSheet, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./RootStackParams";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button } from "@rneui/base";

type feedScreenProp = StackNavigationProp<RootStackParamList, "Feed">;

export default function FeedScreen() {
  const navigation = useNavigation<feedScreenProp>();
  return (
    <View style={styles.container}>
      <Text style={{ color: "black" }}>Feed for posts here.</Text>
      <StatusBar style="auto" />
      <Button title="Add" onPress={() => navigation.navigate("Add")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
