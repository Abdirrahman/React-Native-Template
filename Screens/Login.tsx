import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
// import { Button,Input } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./RootStackParams";
import { TouchableOpacity } from "react-native-gesture-handler";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "../components/auth";
import { Button, Input } from "@rneui/themed";
type loginScreenProp = StackNavigationProp<RootStackParamList, "Login">;

export default function LoginScreen() {
  const navigation = useNavigation<loginScreenProp>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser: any) => {
      if (authUser) {
        navigation.replace("Feed");
      }
    });
    return unsubscribe;
  }, []);

  const signIn = async () => {
    if (email && password) {
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        navigation.navigate("Feed");
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert("Missing fields");
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button
        containerStyle={styles.button}
        onPress={() => navigation.navigate("Register")}
        title="Register"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
