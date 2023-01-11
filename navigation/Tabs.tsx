import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeStackNavigator from "./HomeStack";
import FeedScreen from "../Screens/Feed";
import AddScreen from "../Screens/Add";
import { RootStackParamList } from "./RootStackParams";
import Save from "../Screens/Save";

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeStack" component={HomeStackNavigator} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Add" component={AddScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
