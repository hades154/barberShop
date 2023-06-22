import React from "react";
import { AppRegistry } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./navigator/appStack";

const App = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

AppRegistry.registerComponent("eHair", () => App);

export default App;
