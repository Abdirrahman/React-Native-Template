import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import BottomTabs from "./Tabs";
import HomeStackNavigator from "./HomeStack";

const RootNavigator = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user === null) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
      console.log(user);
    }
  }, []);

  if (!loggedIn) {
    return (
      <NavigationContainer>
        <HomeStackNavigator />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    );
  }
};

export default RootNavigator;
