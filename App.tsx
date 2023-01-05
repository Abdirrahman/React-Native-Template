import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Screens/Home";
import LoginScreen from "./Screens/Login";
import { RootStackParamList } from "./Screens/RootStackParams";
import RegisterScreen from "./Screens/Register";
import FeedScreen from "./Screens/Feed";
import AddScreen from "./Screens/Add";
import Save from "./Screens/Save";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const Tab = createBottomTabNavigator();

  function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Feed" component={FeedScreen} />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="MyTabs" component={MyTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
