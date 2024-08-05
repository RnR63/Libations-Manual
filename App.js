import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, Text, View } from "react-native";
import Home from "./src/screens/Home";
import LandingPage from "./src/screens/LandingPage";
import CocktailPage from "./src/screens/CocktailPage";
import VarelaRegular from "./src/assets/fonts/Varela-Regular.ttf";
import PeraltaRegular from "./src/assets/fonts/Peralta-Regular.ttf";
import OpenSans from  "./src/assets/fonts/OpenSans-VariableFont_wdth,wght.ttf";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const RootStack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Varela-Regular": VarelaRegular,
    "Peralta-Regular": PeraltaRegular,
    "OpenSans-Regular": OpenSans,
  });
// OpenSans-VariableFont_wdth,wght
  useEffect(() => {
      if (fontsLoaded) {
        SplashScreen.hideAsync();
      }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
      return null;
    }

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            animationEnabled: false, // Disable animation for Home screen
          }}
        />
        <RootStack.Screen
          name="CocktailPage"
          component={CocktailPage}
          options={({ route }) => ({
            title: route.params.cocktail.name,
            headerTitleStyle: { fontFamily: "Peralta-Regular", fontSize: 24 },
            headerBackTitle: "Back",
          })}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
