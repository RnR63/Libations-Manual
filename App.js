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

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const RootStack = createStackNavigator();
// const MainStack = createStackNavigator();

// const MainStackScreen = () => {
//   return (
//     <MainStack.Navigator>
//       <MainStack.Screen
//         name="LandingPage"
//         component={LandingPage}
//         options={{ headerShown: false }}
//       />
//       <MainStack.Screen
//         name="Home"
//         component={Home}
//         options={{
//           headerShown: false,
//           animationEnabled: false, // Disable animation for Home screen
//         }}
//       />
//     </MainStack.Navigator>
//   );
// };

const App = () => {
  const [fontsLoaded] = useFonts({
    "Varela-Regular": VarelaRegular,
  });

  if (!fontsLoaded) {
    return null;
  }

  // Hide the splash screen once fonts are loaded
  SplashScreen.hideAsync();

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
            headerTitleStyle: { fontFamily: "VarelaRegular", fontSize: 24 },
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
