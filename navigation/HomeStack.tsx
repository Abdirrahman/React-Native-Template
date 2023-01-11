import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../Screens/Home";
import { RootStackParamList } from "./RootStackParams";
import LoginScreen from "../Screens/Login";
import RegisterScreen from "../Screens/Register";
import FeedScreen from "../Screens/Feed";
import AddScreen from "../Screens/Add";
import Save from "../Screens/Save";

const HomeStack = createNativeStackNavigator<RootStackParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Login" component={LoginScreen} />
      <HomeStack.Screen name="Register" component={RegisterScreen} />
      <HomeStack.Screen name="Feed" component={FeedScreen} />
      <HomeStack.Screen name="Add" component={AddScreen} />
      <HomeStack.Screen name="Save" component={Save} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
