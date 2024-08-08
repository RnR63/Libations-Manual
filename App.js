import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Home from "./src/screens/Home";
import CocktailPage from "./src/screens/CocktailPage";
import PeraltaRegular from "./src/assets/fonts/Peralta-Regular.ttf";
import LatoRegular from "./src/assets/fonts/Lato-Regular.ttf";
import LatoBold from "./src/assets/fonts/Lato-Bold.ttf";
import { useEffect, useCallback } from "react";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const RootStack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    "Peralta-Regular": PeraltaRegular,
    "Lato-Regular": LatoRegular,
    "Lato-Bold": LatoBold,
  });

  const loadSplashScreen = useCallback(async () => {
    if (fontsLoaded) {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

useEffect(() => {
  loadSplashScreen();
}, [loadSplashScreen]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            accessibilityLabel: "Home Screen",
          }}
        />
        <RootStack.Screen
          name="CocktailPage"
          component={CocktailPage}
          options={({ route }) => ({
            title: route.params.cocktail.name,
            headerTitleStyle: { fontFamily: "Peralta-Regular", fontSize: 32 },
            headerBackTitle: "Back",
            headerStyle: {
              borderBottomWidth: 0,
              shadowOpacity: 0,
              elevation: 0,
            },
            accessibilityLabel: `Cocktail Page for ${route.params.cocktail.name}`,
          })}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
